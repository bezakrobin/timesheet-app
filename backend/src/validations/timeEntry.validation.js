'use strict';

const Joi = require('joi');

const timeEntryValidationSchema = Joi.object({
    user_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    task_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    project_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    approver_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    entry_date: Joi.date().required(),
    duration_minutes: Joi.number().integer().positive().required(),
    notes: Joi.string().allow(null, ''),
    is_billable: Joi.boolean().required(),
    approved_at: Joi.date().allow(null),
});

module.exports = timeEntryValidationSchema;