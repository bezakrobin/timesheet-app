const app = require('./app');
const config = require('./config');

const PORT = config.port;

// Spuštění HTTP serveru
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Environment: ${config.env}`);
    // Zde můžete přidat logiku po úspěšném startu, např. test připojení k DB
});

// Graceful shutdown (zpracování signálů pro ukončení) - volitelné, ale dobrá praxe
const shutdown = (signal) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(() => {
        console.log('HTTP server closed.');
        // Zde můžete přidat uzavření DB spojení atd.
        // Např. db.sequelize.close().then(() => console.log('DB connection closed.'));
        process.exit(0); // Ukončení procesu
    });

    // Pokud se server neuzavře včas, vynutit ukončení
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down.');
        process.exit(1);
    }, 10000); // 10 sekund timeout
};

process.on('SIGTERM', () => shutdown('SIGTERM')); // Signál pro ukončení (např. od Dockeru, PM2)
process.on('SIGINT', () => shutdown('SIGINT'));   // Signál při Ctrl+C v terminálu

// Zpracování neošetřených chyb a odmítnutých promises - důležité pro stabilitu
process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', error);
    // Zde by mělo být robustnější logování chyby
    process.exit(1); // Ukončení je nutné, aplikace je v nekonzistentním stavu
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...', reason);
    // Zde by mělo být robustnější logování chyby
    server.close(() => { // Pokusit se nejprve korektně ukončit server
        process.exit(1);
    });
});
