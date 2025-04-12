'use strict';

const Joi = require('joi');
const { PROJECT_ROLE_VALUES } = require('../enums');

const projectMembershipValidationSchema = Joi.object({
    user_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    project_id: Joi.string().guid({ version: 'uuidv4' }).required(),
    role: Joi.string().required().valid(...PROJECT_ROLE_VALUES),
});

module.exports = projectMembershipValidationSchema;