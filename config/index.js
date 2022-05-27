/* loads environment variables from a .env file into process.env */
require('dotenv').config();

let env = process.env.NODE_ENV || 'development',
	cfg = require('./config.' + env);

module.exports = cfg;