'use strict';

/**
 * Express middleware handler function for requests that match no other routes.
 * Creates a 404 error and passes it to the next middleware (global error handler).
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object (unused directly here).
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
const notFoundHandler = (req, res, next) => {
    const err = new Error(`Resource not found at ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
};

// Export the handler function
module.exports = notFoundHandler;