'use strict';

const { Sequelize } = require('sequelize');
const config = require('../config');

console.log('🔧 Executing db/index.js');

// --- Validate Essential Configuration ---
if (!config.DB_NAME || !config.DB_USER || !config.DB_PASSWORD || !config.DB_HOST || !config.DB_PORT) {
    console.error('❌ Fatal Error: Database configuration is incomplete in config. Ensure DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, and DB_PORT are available.');
    process.exit(1);
}

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

let sequelizeInstance = null;
try {
    sequelizeInstance = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, options);
    console.log('✅ Sequelize instance created successfully.');
} catch (error) {
    console.error('❌ Error creating Sequelize instance:', error);
    process.exit(1);
}


// --- Test Connection Function ---
const testDbConnection = async (instance) => {
    if (!instance) {
        console.error('❌ Cannot test connection, Sequelize instance is null.');
        return;
    }
    try {
        await instance.authenticate();
        console.log('✅ Database connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

// --- Execute Connection Test ---
void testDbConnection(sequelizeInstance);

// --- Export the Sequelize Instance ---
console.log(`🔧 Exporting sequelize instance from db/index.js (Type: ${typeof sequelizeInstance})`);
module.exports = sequelizeInstance;