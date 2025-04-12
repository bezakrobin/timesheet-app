'use strict';

const Joi = require('joi');

const clientValidationSchema = Joi.object({
    name: Joi.string().required().max(255),
    contact_person: Joi.string().allow(null).max(255),
    email: Joi.string().email({ tlds: { allow: false } }).allow(null).max(255),
    phone: Joi.string().allow(null).max(50),
    address: Joi.string().allow(null),
    vat_id: Joi.string().allow(null).max(50),
});

module.exports = clientValidationSchema;