'use strict';

const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    class TaskTag extends Model {}

    TaskTag.init({
        task_tag_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
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
        tag_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tags',
                key: 'tag_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'TaskTag',
        tableName: 'task_tags',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['task_id', 'tag_id'],
                name: 'task_tags_task_id_tag_id_key'
            }
        ]
    });

    return TaskTag;
};