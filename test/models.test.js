/* global describe test beforeAll afterAll */

const { expect } = require('chai');
const db = require('../models');
const { ResetTestDB, SetDefaultTestDB } = require('./testutils');


describe('models test', () => {
    beforeAll(async () => {
        expect(process.env.NODE_ENV).to.be.equal('test');
        await ResetTestDB();
        await SetDefaultTestDB();
    }, 3000);

    afterAll(async () => {
        await ResetTestDB();
    });

    test('Test find', (done) => {
        const GOLDEN_INFOS = [{
            id: 1,
            url: 'http://test01',
            title: 'test title01',
            description: 'test descrption01',
            picPath: 'test01.png',
        }, {
            id: 2,
            url: 'http://test02',
            title: 'test title02',
            description: 'test descrption02',
            picPath: 'test02.png',
        }];
        db.Bookmark.findAll({}).then((testData) => {
            expect(testData.length).to.be.equal(2);
            const keys = Object.keys(GOLDEN_INFOS[0]);
            for (let foundIdx = 0; foundIdx < testData.length; foundIdx += 1) {
                for (let keyIdx = 0; keyIdx < keys.length; keyIdx += 1) {
                    expect(testData[foundIdx].dataValues[keys[keyIdx]])
                        .to.be.equal(GOLDEN_INFOS[foundIdx][keys[keyIdx]]);
                }
            }
            done();
        });
    });

    test('Test create check', (done) => {
        const GOLDEN_INFO = {
            url: 'my test url',
            title: 'my test title',
            description: 'my test description',
            picPath: 'my test picname',
        };
        let bookmark;

        db.Bookmark.create(GOLDEN_INFO).then((data) => {
            bookmark = data;
            return db.Bookmark.findAll({
                where: {
                    id: bookmark.dataValues.id,
                },
            });
        }).then((testData) => {
            expect(testData.length).to.be.equal(1);
            const keys = Object.keys(GOLDEN_INFO);
            for (let i = 0; i < keys.length; i += 1) {
                expect(testData[0].dataValues[keys[i]]).to.be.equal(bookmark.dataValues[keys[i]]);
            }
            expect(testData[0].dataValues.id).to.be.equal(bookmark.dataValues.id);
            done();
        });
    });

    test('Test create duplicate check', (done) => {
        const GOLDEN_INFO = {
            url: 'my test url duplicate',
            title: 'my test title duplicate',
            description: 'my test description duplicate',
            picPath: 'my test picname duplicate',
        };
        db.Bookmark.create(GOLDEN_INFO).then(() => db.Bookmark.create(GOLDEN_INFO)).then(() => {
            done(1);
        }).catch((e) => {
            expect(e.name).to.be.equal('SequelizeUniqueConstraintError');
            done();
        });
    });

    test('Test update check', (done) => {
        const GOLDEN_INFO = {
            url: 'my test update url',
            title: 'my test update title',
            description: 'my test update description',
            picPath: 'my test update picname',
        };
        const UPDATE_INFO = {
            url: 'my test update new url',
            title: 'my test update new title',
            description: 'my test update new description',
            picPath: 'my test update new picname',
        };
        let bookmark;
        db.Bookmark.create(GOLDEN_INFO).then((data) => {
            bookmark = data;
            return db.Bookmark.update(UPDATE_INFO, {
                where: {
                    id: data.dataValues.id,
                },
            });
        }).then((testData) => {
            expect(testData.length).to.be.equal(1);
            return db.Bookmark.findAll({
                where: {
                    id: bookmark.dataValues.id,
                },
            });
        }).then((testData) => {
            expect(testData.length).to.be.equal(1);
            const keys = Object.keys(UPDATE_INFO);
            for (let i = 0; i < keys.length; i += 1) {
                expect(testData[0].dataValues[keys[i]]).to.be.equal(UPDATE_INFO[keys[i]]);
            }
            expect(testData[0].dataValues.id).to.be.equal(bookmark.dataValues.id);
            done();
        });
    });

    test('Test delete check', (done) => {
        const GOLDEN_INFO = {
            url: 'my test delete url',
            title: 'my test delete title',
            description: 'my test delete description',
            picPath: 'my test delete picname',
        };
        let bookmark;
        db.Bookmark.create(GOLDEN_INFO).then((data) => {
            bookmark = data;
            return db.Bookmark.destroy({
                where: {
                    id: bookmark.dataValues.id,
                },
            });
        }).then((testData) => {
            expect(testData).to.be.equal(1);
            return db.Bookmark.findAll({
                where: {
                    id: bookmark.dataValues.id,
                },
            });
        }).then((testData) => {
            expect(testData.length).to.be.equal(0);
            done();
        });
    });
});
