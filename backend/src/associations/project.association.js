'use strict';

module.exports = (db) => {
    const { Project, Client, User, Task, TimeEntry, ProjectMembership } = db;

    if (Project) {
        if (Client) {
            Project.belongsTo(Client, {
                foreignKey: 'client_id',
                targetKey: 'client_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                as: 'client'
            });
        }

        if (User) {
            Project.belongsTo(User, {
                foreignKey: 'project_manager_id',
                targetKey: 'user_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                as: 'projectManager'
            });
        }

        if (Task) {
            Project.hasMany(Task, {
                foreignKey: 'project_id',
                sourceKey: 'project_id',
                onDelete: 'CASCADE',
                as: 'tasks'
            });
        }

        if (TimeEntry) {
            Project.hasMany(TimeEntry, {
                foreignKey: 'project_id',
                sourceKey: 'project_id',
                onDelete: 'CASCADE',
                as: 'timeEntries'
            });
        }

        if (User && ProjectMembership) {
            Project.belongsToMany(User, {
                through: ProjectMembership,
                foreignKey: 'project_id',
                otherKey: 'user_id',
                as: 'members'
            });
            Project.hasMany(ProjectMembership, { foreignKey: 'project_id'});
        }

    } else {
        console.warn('Could not define associations for Project: Project model missing');
    }
};