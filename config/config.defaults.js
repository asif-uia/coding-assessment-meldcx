"use strict"

module.exports = {
	env: process.env.NODE_ENV || "development",
	db: {},
	logger: require('./config.winston')
}