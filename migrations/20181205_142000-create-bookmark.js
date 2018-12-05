module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Bookmarks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        url: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        picName: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    /* eslint-disable-next-line no-unused-vars */
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Bookmarks'),
};
