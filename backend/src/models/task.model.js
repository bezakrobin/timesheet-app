'use strict';

const { Model, DataTypes, UUIDV4 } = require('sequelize');
const { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../enums');

module.exports = (sequelize) => {
    class Task extends Model {}

    Task.init({
        task_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        project_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'project_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        creator_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        assignee_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        parent_task_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'tasks',
                key: 'task_id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...TASK_STATUS_VALUES),
            allowNull: false,
            defaultValue: 'todo',
        },
        priority: {
            type: DataTypes.ENUM(...TASK_PRIORITY_VALUES),
            allowNull: true,
        },
        due_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        estimated_hours: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: true,
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
        timestamps: true,
        underscored: true,
    });

    return Task;
};