'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('../config');

// --- Configure Core Middleware ---

// Helmet: Applies various security headers
console.log('🦠 Initializing Helmet middleware with default settings.');
const helmetMiddleware = helmet();

// CORS: Configure Cross-Origin Resource Sharing
console.log(`🔧 Initializing CORS middleware for origin: ${config.CORS_ORIGIN || 'configured origins'}`);
const corsMiddleware = cors({
    origin: config.CORS_ORIGIN,
    credentials: true
});

// Rate Limiter: Basic protection against brute-force/DDoS attacks
console.log('⏱️ Initializing Rate Limiter middleware.');
const limiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Body Parsers: Parse JSON and URL-encoded request bodies
console.log('📦 Initializing JSON and URL-encoded body parsing middleware.');
const jsonMiddleware = express.json({ limit: '10kb' });
const urlencodedMiddleware = express.urlencoded({ extended: true, limit: '10kb' });


// --- Export Middleware ---
module.exports = [
    helmetMiddleware,
    corsMiddleware,
    limiterMiddleware,
    jsonMiddleware,
    urlencodedMiddleware,
];