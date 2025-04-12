'use strict';

const config = require('../config');

/**
 * Global Express error handling middleware.
 * Sends a standardized JSON response for errors passed via next(err).
 * Logs errors to the console based on the provided logic.
 *
 * @param {Error | any} err - The error object. Should ideally have statusCode and message properties.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} _next - The Express next function (marked as unused).
 */
const globalErrorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    const message = err.message || 'An unexpected error occurred.';

    if (statusCode) {
        console.error(`💥 ERROR: ${statusCode} [${status}] - ${message}`);
        if (config.NODE_ENV === 'development') {
            console.error(err.stack || err);
        }
    }

    if (!res.headersSent) {
        res.status(statusCode).json({
            status: status,
            message: message,
            stack: config.NODE_ENV === 'development' ? err.stack : undefined
        });
    } else {
        console.error("Error Handler: Headers already sent, cannot send error response.");
    }
};

module.exports = globalErrorHandler;