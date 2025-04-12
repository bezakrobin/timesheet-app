'use strict';

const express = require('express');
const config = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
    const env = config.NODE_ENV || 'development';
    res.json({ message: `Timesheet App API is running ${env}` });
});

module.exports = router;