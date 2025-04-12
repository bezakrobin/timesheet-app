'use strict';

const app = require('./app');
const config = require('./config');
// const db = require('./models');
// const { testDbConnection } = require("./db");

// --- Test DB Connection ---
// void testDbConnection();

// --- Import Handler Factories ---
const createUnhandledRejectionHandler = require('./handlers/unhandledRejection.handler');
const createSigtermHandler = require('./handlers/sigterm.handler');
const createUncaughtExceptionHandler = require('./handlers/uncaughtException.handler');
const createSigintHandler = require('./handlers/sigint.handler');

// --- Start the Server ---
console.log(`🔧 Attempting to start server on port ${config.PORT}...`);
const server = app.listen(config.PORT, () => {
    console.log(`✅  Server is listening on port ${config.PORT}...`);
    console.log(`💻 Environment: ${config.NODE_ENV}`);
    console.log(`ℹ️ Press CTRL+C to stop\n`);
});

// --- Register Process Event Handlers ---
process.on('unhandledRejection', createUnhandledRejectionHandler(server));
process.on('SIGTERM', createSigtermHandler(server));
process.on('uncaughtException', createUncaughtExceptionHandler(server));
process.on('SIGINT', createSigintHandler(server));