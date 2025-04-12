'use strict';

module.exports = (db) => {
    const { TaskTag, Task, Tag } = db;

    if (TaskTag) {
        if (Task) {
            TaskTag.belongsTo(Task, {
                foreignKey: 'task_id',
                targetKey: 'task_id',
                onDelete: 'CASCADE'
            });
        }
        if (Tag) {
            TaskTag.belongsTo(Tag, {
                foreignKey: 'tag_id',
                targetKey: 'tag_id',
                onDelete: 'CASCADE'
            });
        }
    } else {
        console.warn('Could not define associations for TaskTag: TaskTag model missing');
    }
};