'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// --- 1. Import the CENTRALIZED Sequelize Instance ---
console.log('🔧 Loading models/index.js');
console.log('🔧 Requiring database connection (db/index.js)');
const sequelize = require('../db');

// --- Initialize db Object ---
const db = {};

// --- 2. Load Model Files ---
console.log('🔧 Loading model definition files');
try {
    fs.readdirSync(__dirname)
        .filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                file !== basename &&
                file.slice(-3) === '.js' &&
                file.indexOf('.test.js') === -1
            );
        })
        .forEach(file => {
            // --- 3. Initialize Each Model ---
            const modelDefinition = require(path.join(__dirname, file));
            const model = modelDefinition(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
            console.log(`✅  Loaded model: ${model.name} from ${file}`);
        });
} catch (error) {
    console.error('❌ Error loading model definition files:', error);
    process.exit(1);
}

// --- 4. Set Up Associations ---
console.log('🔧 Setting up model associations');
try {
    const defineUserAssociations = require('../associations/user.association');
    const defineClientAssociations = require('../associations/client.association');

    if (Object.prototype.hasOwnProperty.call(db, 'User')) {
        defineUserAssociations(db);
    }
    if (Object.prototype.hasOwnProperty.call(db, 'Client')) {
        defineClientAssociations(db);
    }

    console.log('✅  Associations configured successfully.');

} catch (error) {
    console.error('❌  Error loading or running association files:', error);
    console.warn('🔧 Associations might not be fully set up.');
    process.exit(1)
}

// --- 5. Export db Object ---
db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('✅  models/index.js finished loading');
module.exports = db;