'use strict';

const ProjectRole = Object.freeze({
    MEMBER: 'member',
    MANAGER: 'manager',
    VIEWER: 'viewer',
});

const PROJECT_ROLE_VALUES = Object.values(ProjectRole);

module.exports = {
    ProjectRole,
    PROJECT_ROLE_VALUES,
};