'use strict';

const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    class Client extends Model {}

    Client.init({
        client_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        contact_person: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        vat_id: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'Client',
        tableName: 'clients',
        timestamps: true,
        underscored: true,
    });

    return Client;
};