module.exports = (sequelize, Sequelize) => {
    const Contacts = sequelize.define("contacts", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        home: {
            type: Sequelize.STRING
        },
        cell: {
            type: Sequelize.STRING
        },
        note_title: {
            type: Sequelize.STRING
        },
        note_description: {
            type: Sequelize.TEXT
        },
        note_date: {
            type: Sequelize.DATE
        }
    });
    return Contacts;
};