const { Sequelize } = require('sequelize');
const config = require('../config');

// Validate that the database URL is set
if (!config.db.url) {
    console.error('FATAL ERROR: DATABASE_URL environment variable is not set.');
    process.exit(1); // Exit if DB URL is missing
}

// Initialize Sequelize instance
const sequelize = new Sequelize(config.db.url, {
    dialect: 'postgres',
    logging: config.env === 'development' ? console.log : false, // Log SQL queries in development
    dialectOptions: {
        // Add SSL options if required by your database provider
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        // },
    },
    define: {
        // Define global model options if needed
        // underscored: true, // Use snake_case for table names and columns
    },
});

// Test the database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // Optional: Sync models (useful for development, use migration for production)
        if (config.env === 'development') {
            await sequelize.sync({ alter: true });
            console.log("Models synchronized wit database.");
        }
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1); // Exit if connection fails
    }
}

// Export the sequelize instance and Sequelize library
const db = {
    sequelize,
    Sequelize,
    connectDB, // Export connection function
};

module.exports = db;