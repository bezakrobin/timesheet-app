'use strict';

const { Sequelize } = require('sequelize');
const config = require('../config');

// --- Sequelize Configuration Options ---
const options = {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DB_DIALECT,
    logging: config.NODE_ENV === 'development' ? console.log : false,

};

// --- Create Sequelize Instance ---
console.log(`🌱 Initializing Sequelize for [${config.NODE_ENV}] environment...`);
console.log(`🔗 Connecting to database: ${config.DB_NAME} on host: ${config.DB_HOST}:${config.DB_PORT}`);

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, options);

// --- Test Connection ---
const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

void testDbConnection();

module.exports = sequelize;