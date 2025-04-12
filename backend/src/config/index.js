require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.SECRET_KEY || 'default-secret-key',
        expiresIn: '30m',
        refreshExpiresIn: '7d',
    },
    api: {
        prefix: process.env.API_PREFIX || '/api/v1',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    },
};

if (!config.db.url) {
    console.error("FATAL ERROR: DATABASE_URL environment variable is not set.");
    process.exit(1);
}
if (!process.env.SECRET_KEY && config.env !== 'development') {
    console.warn("WARNING: SECRET_KEY environment variable is not set. Using default weak secret. THIS IS NOT SAFE FOR PRODUCTION!");
}

module.exports = config;