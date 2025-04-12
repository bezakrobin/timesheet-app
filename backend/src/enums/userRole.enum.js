'use strict';

const UserRole = Object.freeze({
    ADMIN: 'admin',
    MANAGER: 'manager',
    MEMBER: 'member',
    VIEWER: 'viewer',
});

const USER_ROLE_VALUES = Object.values(UserRole);

module.exports = {
    UserRole,
    USER_ROLE_VALUES,
};