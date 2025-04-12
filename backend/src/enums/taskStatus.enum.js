'use strict';

const TaskStatus = Object.freeze({
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    DONE: 'done',
    BLOCKED: 'blocked',
});

const TASK_STATUS_VALUES = Object.values(TaskStatus);

module.exports = {
    TaskStatus,
    TASK_STATUS_VALUES,
};