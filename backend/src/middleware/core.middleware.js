'use strict';

const express = require('express');
const cors = require('cors');
const config = require('../config');

// --- Configure Core Middleware ---
console.log(`🔧 Initializing CORS middleware for origin: ${config.CORS_ORIGIN || '*'}`);
const corsMiddleware = cors({
    origin: config.CORS_ORIGIN,
});

const jsonMiddleware = express.json({ limit: '10kb' });

const urlencodedMiddleware = express.urlencoded({ extended: true, limit: '10kb' });


// --- Export Middleware ---
module.exports = [
    corsMiddleware,
    jsonMiddleware,
    urlencodedMiddleware,
];