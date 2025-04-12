'use strict';

const app = require('./app');
const config = require('./config');

// --- Start the Server ---
const server = app.listen(config.PORT, () => {
    console.log(`✅  Server is listening on port ${config.PORT}...`);
    console.log(`   Environment: ${config.NODE_ENV}`);
    console.log(`   Press CTRL+C to stop\n`);
});