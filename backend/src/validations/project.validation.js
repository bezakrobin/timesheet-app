'use strict';

const Joi = require('joi');
const { PROJECT_STATUS_VALUES } = require('../enums');

const projectValidationSchema = Joi.object({
    client_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    project_manager_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    project_code: Joi.string().allow(null, '').max(50),
    name: Joi.string().required().max(255),
    description: Joi.string().allow(null, ''),
    status: Joi.string().required().valid(...PROJECT_STATUS_VALUES),
    start_date: Joi.date().allow(null),
    end_date: Joi.date().allow(null).min(Joi.ref('start_date')),
    budget_hours: Joi.number().min(0).allow(null),
    is_billable: Joi.boolean().required(),
});

module.exports = projectValidationSchema;