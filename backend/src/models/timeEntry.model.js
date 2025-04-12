'use strict';

const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    class TimeEntry extends Model {}

    TimeEntry.init({
        time_entry_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        task_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tasks',
                key: 'task_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        entry_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_billable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        approved_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        approver_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'TimeEntry',
        tableName: 'time_entries',
        timestamps: true,
        underscored: true,
    });

    return TimeEntry;
};