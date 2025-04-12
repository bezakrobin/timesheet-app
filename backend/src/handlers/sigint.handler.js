'use strict';

/**
 * Creates a handler for the SIGINT signal (Ctrl+C).
 * @param {import('http').Server} server - The HTTP server instance.
 * @returns {() => void} The event handler function.
 */
module.exports = (server) => {
    return () => {
        console.log('🚦 SIGINT (Ctrl+C) RECEIVED. Shutting down gracefully...');
        server.close(() => {
            console.log('   Process terminated via SIGINT.');
            process.exit(0);
        });
    };
};