'use strict';

module.exports = (db) => {
    const { Client, Project } = db;

    if (Client && Project) {
        Client.hasMany(Project, {
            foreignKey: 'client_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            as: 'projects'
        });
    } else {
        console.warn(`Could not define associations for Client: ${Client ? '' : 'Client model missing'} ${Project ? '' : 'Project model missing'}`);
    }

};