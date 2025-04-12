'use strict';

const express = require('express');
const coreMiddleware = require('./middleware/core.middleware');
const baseRouter = require('./routes/base.route');
const notFoundHandler = require('./handlers/notFound.handler');
const globalErrorHandler = require('./handlers/globalError.handler');

// --- Initialize Express App ---
const app = express();

// --- Apply Middleware ---
app.use(...coreMiddleware);

// --- Mount Routers ---
app.use('/', baseRouter);

// --- Not Found Handler (404) ---
app.use(notFoundHandler);

// --- Global Error Handling Middleware ---
app.use(globalErrorHandler);

module.exports = app;