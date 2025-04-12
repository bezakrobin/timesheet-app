'use strict';

const Joi = require('joi');

const taskTagValidationSchema = Joi.object({
    task_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    tag_id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = taskTagValidationSchema;