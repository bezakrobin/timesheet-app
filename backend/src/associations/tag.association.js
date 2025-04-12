'use strict';

module.exports = (db) => {
    const { Tag, Task, TaskTag } = db;

    if (Tag) {
        if (Task && TaskTag) {
            Tag.belongsToMany(Task, {
                through: TaskTag,
                foreignKey: 'tag_id',
                otherKey: 'task_id',
                as: 'tasks'
            });
            Tag.hasMany(TaskTag, { foreignKey: 'tag_id'});
        }
    } else {
        console.warn('Could not define associations for Tag: Tag model missing');
    }
};