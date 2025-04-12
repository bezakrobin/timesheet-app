'use strict';

const Joi = require('joi');

const tagValidationSchema = Joi.object({
    name: Joi.string().required().max(100),
    color: Joi.string().allow(null, '').pattern(/^#[A-Fa-f0-9]{6}$/).max(7),
});

module.exports = tagValidationSchema;