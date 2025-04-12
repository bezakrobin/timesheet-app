'use strict';

/**
 * Creates a handler for uncaught exceptions.
 * According to Node.js docs, attempting anything other than cleanup and exit
 * after an uncaught exception is unsafe.
 * @param {import('http').Server} server - The HTTP server instance.
 * @returns {(error: Error, origin: string) => void} The event handler function.
 */
module.exports = (server) => {
    return (err) => {
        console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
        console.error(err.name, err.message);
        console.error(err.stack);
        server.close(() => {
            console.log(' Process exiting due to uncaught exception.');
            process.exit(1);
        });
        setTimeout(() => process.exit(1), 5000);
    };
};