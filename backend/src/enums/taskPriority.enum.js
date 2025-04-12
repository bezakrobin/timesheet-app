'use strict';

const TaskPriority = Object.freeze({
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
});

const TASK_PRIORITY_VALUES = Object.values(TaskPriority);

module.exports = {
    TaskPriority,
    TASK_PRIORITY_VALUES,
};