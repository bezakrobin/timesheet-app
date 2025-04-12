const express = require('express');
const config = require('./config');
const cors = require('cors');

// Import routerů
const apiRoutes = require('./routes');

// Import middleware (až budou existovat)
// const errorHandler = require('./middleware/errorHandler.middleware');

// Vytvoření instance Express aplikace
const app = express();

// --- Základní Middleware ---

// Povolení zpracování JSON request body
app.use(express.json());

// Povolení zpracování URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Nastavení CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: config.cors.origin,
  // credentials: true, // Pokud potřebujeme posílat cookies/authorization headers
};
app.use(cors(corsOptions));

// Jednoduchý middleware pro logování requestů
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});


// --- API Routes ---
// Zde připojíte hlavní router (až bude existovat)
// app.use(config.api.prefix, apiRoutes);

// --- Základní cesta pro ověření běhu ---
app.get('/', (req, res) => {
    res.status(200).json({ message: `Welcome to Timesheet Application API!` });
});


// --- Zpracování nenalezených cest (404) ---
// Musí být až po definici všech cest
app.use((req, res, next) => {
    res.status(404).json({ code: 'NOT_FOUND', message: 'The requested resource was not found on this server.' });
});

// --- Centrální Error Handling Middleware ---
// Musí být definován jako poslední middleware
// app.use(errorHandler);

module.exports = app;