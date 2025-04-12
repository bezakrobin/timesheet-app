'use strict';

module.exports = (models) => {
    const { User, Task, Project, ProjectMembership, TimeEntry } = models;

    User.belongsTo(User, {
        as: 'Manager',
        foreignKey: 'manager_id',
        targetKey: 'user_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
    User.hasMany(User, {
        as: 'Subordinates',
        foreignKey: 'manager_id',
        sourceKey: 'user_id',
    });

    User.hasMany(Project, {
        foreignKey: 'project_manager_id',
        as: 'ManagedProjects',
    });

    User.hasMany(Task, { foreignKey: 'creator_id', as: 'CreatedTasks' });
    User.hasMany(Task, { foreignKey: 'assignee_id', as: 'AssignedTasks' });

    User.hasMany(TimeEntry, { foreignKey: 'user_id', as: 'TimeEntries' });
    User.hasMany(TimeEntry, { foreignKey: 'approver_id', as: 'ApprovedTimeEntries' });

    User.belongsToMany(Project, {
        through: ProjectMembership,
        foreignKey: 'user_id',
        otherKey: 'project_id',
        as: 'Projects',
    });
    User.hasMany(ProjectMembership, { foreignKey: 'user_id' });
};