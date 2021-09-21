import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cacheRoutes from './routes/cache.routes';
import logger from './utils/logger';
import consts from './static/constants';
import logMsgs from './static/log_messages';
import connectMongo from './utils/db';

const app = express();
let server;
try {

	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 2 }));
	app.use(bodyParser.json());

	//Body Parser error handler middleware
	app.use(function (error, req, res, next) {
		if (error instanceof SyntaxError) {
			return res.status(consts.badReqHTTPCode).json({
				error_code: consts.errorCodes.invalidValue,
				message: `${consts.RESPONSE_MESSAGES.INVALID_JSON}: ${error.message}`
			});
		} else {
			next();
		}
	});

	//CORS middleware
	app.use(cors());

	connectMongo().then(() => {
		logger.info(`mongo connected!!`);
	}).catch((err) => {
		throw new Error(`unable to connect to database`);
	});

	app.use('/cache/v1', cacheRoutes);

	app.use((req, res, next) => {
		/* Adding logger for analysis */
		logger.info(`Request Headers: url: ${req.url}; method: ${req.method}; headers: ${JSON.stringify(req.headers)}`);
		next();
	});

	
	//Start server
	const port = process.env.PORT || 5000;
	server = app.listen(port, console.log(`Server started on port ${port}`));
	module.exports = server;
	
} catch (err) {
	logger.info(logMsgs.server_exit);
	logger.info(err.stack);
	process.exit(1);
}

async function shutDown() {
	logger.info(logMsgs.server_shutdown);

	/* Close all connections to node server */
	server.close(() => {
		logger.info(logMsgs.server_closeConn);
		process.exit(0);
	});
	logger.info(logMsgs.server_stopConn);

	/* Wait for 10 seconds and then close forcefully */
	setTimeout(() => {
		logger.error(logMsgs.server_killConn);
		process.exit(1);
	}, 10000);
}

process.on(consts.PROCESS_EVENT.SIGINT, shutDown);
process.on(consts.PROCESS_EVENT.SIGTERM, shutDown);
