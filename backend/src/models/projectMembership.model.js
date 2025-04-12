'use strict';

const { Model, DataTypes, UUIDV4} = require('sequelize');
const { PROJECT_ROLE_VALUES } = require('../enums');

module.exports = (sequelize) => {
    class ProjectMembership extends Model {}

    ProjectMembership.init({
        project_membership_id: {
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
        role: {
            type: DataTypes.ENUM(...PROJECT_ROLE_VALUES),
            allowNull: false,
            defaultValue: 'member',
        },
        joined_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        sequelize,
        modelName: 'ProjectMembership',
        tableName: 'project_memberships',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'project_id'],
                name: 'project_memberships_user_id_project_id_key'
            }
        ]
    });

    return ProjectMembership;
};