import moment from 'moment';
import consts from "../static/constants";
import logger from '../utils/logger';
import logMsgs from '../static/log_messages';
import * as errorHandler from '../utils/error_handler';
import helper from '../utils/helper';
import * as cacheQueries from '../queries/cacheQuery';

/**
 * This function checks if the count has exceed
 * if yes - then its picks up the cache with oldest ttl and updates it with new key, value, ttl
 * otherwise just creates a new entry
 */
const checkCountAndReplaceOrCreate = async (data) => {
	let count = await cacheQueries.countAllKeys();
	logger.info(logMsgs.countDocs(count));
	
	//check if count has already exceeded and update the oldest cache
	if (count >= consts.docsLimit) {
		//find the oldest ttl cached doc and update the new key , value,ttl in it
		const oldestCache = await cacheQueries.findAndUpdate({}, data, { timeToLive: 1 });
		logger.info(logMsgs.cache_replaced(oldestCache));
	}
	else {
		//just create a new entry if the count hasnt exceeded.
		await cacheQueries.createAkey(data);
	}
}

/**
 * creates a new entry if the count hasnt already exceeded, otherwise updates the oldest cache with new value, key and timeToLive
 * updates value based on key
 */
export const createUpdateKeyValue = async (req, res) => {

	try {
		let { params: { key }, body: { value } } = req;

		const findResult = await cacheQueries.findAKey({ key });

		if (!findResult) {
			/* perform the check count flow to create new entry or replace oldest with new data  */
			value = helper.genUUID();
			let data = { key, value, timeToLive: moment().add(consts.timeToLiveMins, 'minutes').toDate() };
			await checkCountAndReplaceOrCreate(data);
		}
		else {
			//ideally ttl should get updated here too, but not implemented as not written in assignment
			/* if result exists , just update it  */
			(!value && errorHandler.logAndThrowErr(logMsgs.valueNotPresent, new Error(consts.RESPONSE_MESSAGES.INVALID_JSON)));
			await cacheQueries.updateAkey({ key }, { value });
		}

		return res.status(consts.successMHTTPCode).json({
			status: consts.successMHTTPCode,
			responseTimeStamp: + new Date(),
			message: consts.successMsg,
			result: { key, value }
		});

	}
	catch (err) {
		/* If errors thrown, return status 400, with the errors.
			If DB structure errors thrown, return status 500*/
		const response = errorHandler.formatErrorMessage(err);
		res.status(response.statusCode).json(response.body);
	}
};

/**
 * if key is present  - updates the ttl and value if only ttl expired
 * if key not present :
 *  if cache limit not exceeded - creates a new entry 
 *  if cache limit exceeded - picks oldest cached entry and updates it key, values , ttl
 */
export const getkeyValue = async (req, res) => {

	try {
		const { key } = req.params;
		const result = await cacheQueries.findAKey({ key });

		let value, newUuidValue = helper.genUUID();
		let data = {
			timeToLive: moment().add(consts.timeToLiveMins, 'minutes').toDate()
		};

		if (!result) {
			logger.info(logMsgs.cacheMiss);
			value = newUuidValue;

			data = { ...data, key, value }
			await checkCountAndReplaceOrCreate(data)

		} else {
			/** Result is present and update ttl value */
			logger.info(logMsgs.cacheHit);
			value = result.value;
			let currentTime = moment().toDate();

			logger.info(`is ttl expired ${moment(result.timeToLive).isBefore(currentTime)}`);
			if (moment(result.timeToLive).isBefore(currentTime)) {
				//ttl is expired , create new value for the key and add it to data obj to update it
				logger.info(logMsgs.ttlExpired);
				value = newUuidValue;
				data = { ...data, value };
			}
			//update ttl and new value if ttl has also expired
			await cacheQueries.updateAkey({ key }, data);
		}

		return res.status(consts.successMHTTPCode).json({
			status: consts.successMHTTPCode,
			responseTimeStamp: + new Date(),
			message: consts.successMsg,
			result: { key, value }
		});

	}
	catch (err) {
		/* If errors thrown, return status 400, with the errors.
			If DB structure errors thrown, return status 500*/
		const response = errorHandler.formatErrorMessage(err);
		res.status(response.statusCode).json(response.body);
	}
};

/**
 * deletes single key is key coming through otherwise deletes all keys
 */
export const deletekey = async (req, res) => {
	logger.info(logMsgs.gRb_start);
	try {
		const { params: { key } } = req;
		let condition = { ...(key && { key }) };
		await cacheQueries.deleteKey(condition);

		return res.status(consts.successMHTTPCode).json({
			status: consts.successMHTTPCode,
			responseTimeStamp: + new Date(),
			message: consts.successMsg,
			result: {}
		});

	}
	catch (err) {
		/* If errors thrown, return status 400, with the errors.
			If DB structure errors thrown, return status 500*/
		const response = errorHandler.formatErrorMessage(err);
		res.status(response.statusCode).json(response.body);
	}
};

/**
 * get all keys
 */
export const getAllKeys = async (req, res) => {

	try {
		const allKeys = await cacheQueries.findAllKeys({},{'__v': 0});
		
		return res.status(consts.successMHTTPCode).json({
			status: consts.successMHTTPCode,
			responseTimeStamp: + new Date(),
			message: consts.successMsg,
			result: allKeys
		});

	}
	catch (err) {
		/* If errors thrown, return status 400, with the errors.
			If DB structure errors thrown, return status 500*/
		const response = errorHandler.formatErrorMessage(err);
		res.status(response.statusCode).json(response.body);
	}
};