'use strict';

const Joi = require('joi');

const userValidationSchema = Joi.object({
    username: Joi.string().required().max(255),
    email: Joi.string().required().email(),
    password_hash: Joi.string().required().min(8),
    first_name: Joi.string().required().max(255),
    last_name: Joi.string().required().max(255),
    avatar_url: Joi.string().uri().allow(null),
    timezone: Joi.string().required().max(100),
    locale: Joi.string().required().max(10),
    job_title: Joi.string().allow(null).max(255),
    default_hourly_rate: Joi.number().min(0).allow(null),
    last_login_ip: Joi.string().ip().allow(null),
});

module.exports = userValidationSchema;