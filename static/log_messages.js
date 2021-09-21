module.exports = {
	/* Main Server Messages */
	server_success: "I am successful :-)",

	val_error_generic: "Validation Error: ",
	val_json_schema: "Validating JSON schema",
	val_success_generic: "Validation Pass: ",
	val_itr_error: "Setting JSON validation errors. ",
	val_itr_error_comp: "Setting JSON validation errors: Completed! ",
	middleware_cIcE_start: "checkIfCacheExists : start",
	middleware_cIcE_end: "checkIfCacheExists : end",
	val_format: "Formatting JSON schema validation errors now.",
	format_err: "Formatting errors",
	format_err_name: (name) => `ERROR thrown: name: ${name}`,
	format_err_msg: (message) => `ERROR thrown: message: ${message}`,

	/* Server log messages */
	server_exit: "Exiting process because of error: ",
	server_shutdown: "Server shutting down.",
	server_closeConn: "Closed out remaining connections",
	server_stopConn: "Received kill signal, shutting down gracefully",
	server_killConn: "Could not close connections in time, forcefully shutting down",

	cacheMiss : "Cache miss",
	cacheHit : "Cache hit",
	ttlExpired : 'ttl expired,creating new value',
	cache_replaced: (cache) => `replaced cache--->>: ${cache}`,
	countDocs: (count) => `count of all docs --->>: ${count}`,
	valueNotPresent : "value not present in update!!",
	
	/* validator  */
	val_start: "validator stat: validating body, query, params start",
};