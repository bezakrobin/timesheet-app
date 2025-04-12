'use strict';

const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '..', '..', '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.warn(`⚠️ Warning: Could not find or load .env file at ${envPath}. Using default values or system environment variables.`);
    throw result.error;
}

// --- Application Configuration ---
const config = {
    // Server configuration
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,

    // Database configuration (mapping from your .env names)
    DB_USER: process.env.POSTGRES_USER || 'timesheet_user',
    DB_PASSWORD: process.env.POSTGRES_PASSWORD || null,
    DB_NAME: process.env.POSTGRES_DB || 'timesheet_db',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_DIALECT: process.env.DB_DIALECT || 'postgres',

    // Security
    SECRET_KEY: process.env.SECRET_KEY || null,

    // API configuration
    API_PREFIX: process.env.API_PREFIX || '/api/v1',

    // CORS configuration
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

// --- Validate Essential Configuration ---
if (!config.DB_PASSWORD) {
    console.error('❌ Fatal Error: POSTGRES_PASSWORD is not set in the environment variables.');
    process.exit(1);
}
if (!config.SECRET_KEY) {
    console.error('❌ Fatal Error: SECRET_KEY is not set in the environment variables.');
    process.exit(1);
}
if (config.NODE_ENV === 'production' && config.CORS_ORIGIN === '*') {
    console.warn('⚠️ Warning: CORS_ORIGIN is set to allow all origins ("*") in production. This is insecure. Please restrict it to your frontend domain.');
}

console.log(`🔧 Configuration loaded for environment: ${config.NODE_ENV}`);

module.exports = config;