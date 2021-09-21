import mongoose from "mongoose";
import logger from '../utils/logger';
import appConfig from "./config";

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
	logger.info("MongoDB Connection Established");
});

mongoose.connection.on("reconnected", () => {
	logger.info("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
	logger.info("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
	logger.info("MongoDB Connection Closed");
});

mongoose.connection.on("error", error => {
	logger.info("MongoDB ERROR: " + error);
	process.exit(1);
});

mongoose.set("debug", appConfig.mongooseDebug);

const connectMongo = async () => {
	let connectionuri = appConfig.mongo.dbConnectionString;
	logger.info('connection uri string',connectionuri);
	await mongoose.connect(connectionuri);
};

export default connectMongo;


