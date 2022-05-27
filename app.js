// module dependencies
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./lib/rateLimiter');
const fileRouter = require('./routes/fileRouter.js');

// create express app instance
const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(rateLimiter)

app.use('/', fileRouter);


module.exports = app;