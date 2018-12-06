module.exports = {
    /* eslint-disable-next-line no-unused-vars */
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Bookmarks', [{
        url: 'http://test01',
        title: 'test title01',
        description: 'test descrption01',
        picName: 'test01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    }, {
        url: 'http://test02',
        title: 'test title02',
        description: 'test descrption02',
        picName: 'test02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {}),
    /* eslint-disable-next-line no-unused-vars */
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Bookmarks', null, {}),
};
