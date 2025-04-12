'use strict';

const ProjectStatus = Object.freeze({
    ACTIVE: 'active',
    ARCHIVED: 'archived',
    COMPLETED: 'completed',
    ON_HOLD: 'on_hold',
    PLANNING: 'planning',
});

const PROJECT_STATUS_VALUES = Object.values(ProjectStatus);

module.exports = {
    ProjectStatus,
    PROJECT_STATUS_VALUES,
};