'use strict';

const Joi = require('joi');
const { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../enums');

const taskValidationSchema = Joi.object({
    project_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    creator_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    assignee_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    parent_task_id: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    title: Joi.string().required().max(255),
    description: Joi.string().allow(null, ''),
    status: Joi.string().required().valid(...TASK_STATUS_VALUES),
    priority: Joi.string().allow(null).valid(...TASK_PRIORITY_VALUES),
    due_date: Joi.date().allow(null),
    estimated_hours: Joi.number().min(0).allow(null),
    completed_at: Joi.date().allow(null),
});

module.exports = taskValidationSchema;