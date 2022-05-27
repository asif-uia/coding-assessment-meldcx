'use strict';

const winston = require('winston');
const appRoot = require('app-root-path');

// define the custom settings for each transport (file, console)
const options = {
	file: {
		level: 'info',
		filename: `${appRoot}/logs/app.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, /* 5 MB */
		maxFiles: 5,
		colorize: false,
		silent: false
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
		silent: false
	},
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console)
	],
	// do not exit on handled exceptions
	exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function (message, encoding) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message);
	},
};

module.exports = logger;