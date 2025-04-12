'use strict';

module.exports = (db) => {
    const { Task, Project, User, TimeEntry, Tag, TaskTag } = db;

    if (Task) {
        if (Project) {
            Task.belongsTo(Project, {
                foreignKey: 'project_id',
                targetKey: 'project_id',
                onDelete: 'CASCADE',
                as: 'project'
            });
        }

        if (User) {
            Task.belongsTo(User, {
                foreignKey: 'creator_id',
                targetKey: 'user_id',
                onDelete: 'RESTRICT',
                as: 'creator'
            });
        }

        if (User) {
            Task.belongsTo(User, {
                foreignKey: 'assignee_id',
                targetKey: 'user_id',
                onDelete: 'SET NULL',
                as: 'assignee'
            });
        }

        Task.belongsTo(Task, {
            foreignKey: 'parent_task_id',
            targetKey: 'task_id',
            onDelete: 'SET NULL',
            as: 'parentTask'
        });
        Task.hasMany(Task, {
            foreignKey: 'parent_task_id',
            sourceKey: 'task_id',
            as: 'subtasks'
        });

        if (TimeEntry) {
            Task.hasMany(TimeEntry, {
                foreignKey: 'task_id',
                sourceKey: 'task_id',
                onDelete: 'CASCADE',
                as: 'timeEntries'
            });
        }

        if (Tag && TaskTag) {
            Task.belongsToMany(Tag, {
                through: TaskTag,
                foreignKey: 'task_id',
                otherKey: 'tag_id',
                as: 'tags'
            });
            Task.hasMany(TaskTag, { foreignKey: 'task_id'});
        }

    } else {
        console.warn('Could not define associations for Task: Task model missing');
    }
};