'use strict';

/**
 * Creates a handler for the SIGTERM signal.
 * @param {import('http').Server} server - The HTTP server instance.
 * @returns {() => void} The event handler function.
 */
module.exports = (server) => {
    return () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully...');
        server.close(() => {
            console.log(' Process terminated via SIGTERM.');
            process.exit(0);
        });
    };
};