const rateLimit = require('express-rate-limit')
require('dotenv').config()

const rateLimiter = rateLimit({
	windowMs: process.env.RATE_INTERVAL,
	max: process.env.RATE_LIMIT_MAX_REQUESTS,
	message: {
		status: 429,
		error: `You exceeded current request limit. Try again in ${process.env.RATE_INTERVAL / (1000 * 60)} minute`
	},
	standardHeaders: true,
	legacyHeaders: false,
})

module.exports = rateLimiter