'use strict';

/**
 * Creates a handler for unhandled promise rejections.
 * @param {import('http').Server} server - The HTTP server instance.
 * @returns {(reason: any, promise: Promise<any>) => void} The event handler function.
 */
module.exports = (server) => {
    return (err) => {
        console.error('💥 UNHANDLED REJECTION! Shutting down...');
        if (err instanceof Error) {
            console.error(err.name, err.message);
            console.error(err.stack);
        } else {
            console.error('Unhandled rejection reason:', err);
        }
        // Attempt graceful shutdown
        server.close(() => {
            console.log(' Process exiting due to unhandled rejection.');
            process.exit(1);
        });
        setTimeout(() => process.exit(1), 7000);
    };
};