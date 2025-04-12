'use strict';

const { Model, DataTypes, UUIDV4 } = require('sequelize');
const { PROJECT_STATUS_VALUES } = require('../enums');

module.exports = (sequelize) => {
    class Project extends Model {}

    Project.init({
        project_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        project_code: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
        client_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'client_id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        project_manager_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...PROJECT_STATUS_VALUES),
            allowNull: false,
            defaultValue: 'planning',
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        budget_hours: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        is_billable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
        timestamps: true,
        underscored: true,
    });

    return Project;
};