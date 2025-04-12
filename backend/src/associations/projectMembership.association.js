'use strict';

module.exports = (db) => {
    const { ProjectMembership, User, Project } = db;

    if (ProjectMembership) {
        if (User) {
            ProjectMembership.belongsTo(User, {
                foreignKey: 'user_id',
                targetKey: 'user_id',
                onDelete: 'CASCADE'
            });
        }
        if (Project) {
            ProjectMembership.belongsTo(Project, {
                foreignKey: 'project_id',
                targetKey: 'project_id',
                onDelete: 'CASCADE'
            });
        }
    } else {
        console.warn('Could not define associations for ProjectMembership: ProjectMembership model missing');
    }
};