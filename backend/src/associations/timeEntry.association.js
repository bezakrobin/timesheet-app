'use strict';

module.exports = (db) => {
    const { TimeEntry, User, Task, Project } = db;

    if (TimeEntry) {
        if (User) {
            TimeEntry.belongsTo(User, {
                foreignKey: 'user_id',
                targetKey: 'user_id',
                onDelete: 'RESTRICT',
                as: 'user'
            });
        }

        if (Task) {
            TimeEntry.belongsTo(Task, {
                foreignKey: 'task_id',
                targetKey: 'task_id',
                onDelete: 'CASCADE',
                as: 'task'
            });
        }

        if (Project) {
            TimeEntry.belongsTo(Project, {
                foreignKey: 'project_id',
                targetKey: 'project_id',
                onDelete: 'CASCADE',
                as: 'project'
            });
        }

        if (User) {
            TimeEntry.belongsTo(User, {
                foreignKey: 'approver_id',
                targetKey: 'user_id',
                onDelete: 'SET NULL',
                as: 'approver'
            });
        }
    } else {
        console.warn('Could not define associations for TimeEntry: TimeEntry model missing');
    }
};