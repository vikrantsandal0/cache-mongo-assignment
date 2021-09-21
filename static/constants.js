
/* This file contains all constants*/
exports.FIELD = {
 KEY : 'key',
 VALUE : 'value',
 TTL : 'timeToLive'
};
exports.service_name = "cache-apis";


exports.RESPONSE_MESSAGES = {
	NO_DATA_FOUND: "No data found",
	INVALID_JSON: "Invalid JSON in request body",
};
exports.successMHTTPCode = 200;
exports.badReqHTTPCode = 400;
exports.preconditionFailedHTTPCode = 412;
exports.errorHTTPCode = 503;
exports.notFoundHTTPCode = 404;


exports.processEvents = {
	SIGINT: "SIGINT",
	SIGTERM: "SIGTERM",
	SIGKILL: "SIGKILL"
};

exports.ISError = "Internal Server Error";
exports.successMsg = "SUCCESS";
exports.PROCESS_EVENT = {
	SIGINT: "SIGINT",
	SIGTERM: "SIGTERM"
};

exports.TYPE = {
	STRING: "string",
	OBJECT: "object",
	C_ERROR: "Error"
};

exports.timeToLiveMins = 10;
exports.docsLimit = 5;
exports.invalidValue = "invalidValue";

exports.errorCodes = {
	"invalidValue": 1004
};