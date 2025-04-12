'use strict';

const { Model, DataTypes, UUIDV4 } = require('sequelize');
const { UserRole, USER_ROLE_VALUES } = require('../enums');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        user_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...USER_ROLE_VALUES),
            allowNull: false,
            defaultValue: UserRole.MEMBER,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        email_verification_token: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true,
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_2fa_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        two_factor_secret: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        two_factor_recovery_codes_hashed: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        password_reset_token: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true,
        },
        password_reset_token_expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        avatar_url: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        timezone: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'UTC',
        },
        locale: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'en-US',
        },
        job_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        manager_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        default_hourly_rate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        last_login_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        last_login_ip: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true,
    });

    return User;
};