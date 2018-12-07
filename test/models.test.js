/* global describe it before after */

const { expect } = require('chai');
const db = require('../models');
const { ResetTestDB, SetDefaultTestDB } = require('./testutils');


describe('models test', () => {
    before(async function Before() {
        this.timeout(3000);
        expect(process.env.NODE_ENV).to.be.equal('test');
        await ResetTestDB();
        await SetDefaultTestDB();
    });

    after(async () => {
        await ResetTestDB();
    });

    it('Test find', async () => {
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
        const testData = await db.Bookmark.findAll({});
        expect(testData.length).to.be.equal(2);
        const keys = Object.keys(GOLDEN_INFOS[0]);
        for (let foundIdx = 0; foundIdx < testData.length; foundIdx += 1) {
            for (let keyIdx = 0; keyIdx < keys.length; keyIdx += 1) {
                expect(testData[foundIdx].dataValues[keys[keyIdx]])
                    .to.be.equal(GOLDEN_INFOS[foundIdx][keys[keyIdx]]);
            }
        }
    });

    it('Test create check', async () => {
        const GOLDEN_INFO = {
            url: 'my test url',
            title: 'my test title',
            description: 'my test description',
            picPath: 'my test picname',
        };
        const bookmark = await db.Bookmark.create(GOLDEN_INFO);
        const testData = await db.Bookmark.findAll({
            where: {
                id: bookmark.dataValues.id,
            },
        });
        expect(testData.length).to.be.equal(1);
        const keys = Object.keys(GOLDEN_INFO);
        for (let i = 0; i < keys.length; i += 1) {
            expect(testData[0].dataValues[keys[i]]).to.be.equal(bookmark.dataValues[keys[i]]);
        }
        expect(testData[0].dataValues.id).to.be.equal(bookmark.dataValues.id);
    });

    it('Test create duplicate check', async () => {
        const GOLDEN_INFO = {
            url: 'my test url duplicate',
            title: 'my test title duplicate',
            description: 'my test description duplicate',
            picPath: 'my test picname duplicate',
        };
        await db.Bookmark.create(GOLDEN_INFO);
        try {
            await db.Bookmark.create(GOLDEN_INFO);
        } catch (e) {
            expect(e.name).to.be.equal('SequelizeUniqueConstraintError');
        }
    });

    it('Test update check', async () => {
        const GOLDEN_INFO = {
            url: 'my test update url',
            title: 'my test update title',
            description: 'my test update description',
            picPath: 'my test update picname',
        };
        const bookmark = await db.Bookmark.create(GOLDEN_INFO);
        const UPDATE_INFO = {
            url: 'my test update new url',
            title: 'my test update new title',
            description: 'my test update new description',
            picPath: 'my test update new picname',
        };
        let testData = await db.Bookmark.update(UPDATE_INFO, {
            where: {
                id: bookmark.dataValues.id,
            },
        });
        expect(testData.length).to.be.equal(1);
        testData = await db.Bookmark.findAll({
            where: {
                id: bookmark.dataValues.id,
            },
        });
        expect(testData.length).to.be.equal(1);
        const keys = Object.keys(UPDATE_INFO);
        for (let i = 0; i < keys.length; i += 1) {
            expect(testData[0].dataValues[keys[i]]).to.be.equal(UPDATE_INFO[keys[i]]);
        }
        expect(testData[0].dataValues.id).to.be.equal(bookmark.dataValues.id);
    });

    it('Test delete check', async () => {
        const GOLDEN_INFO = {
            url: 'my test delete url',
            title: 'my test delete title',
            description: 'my test delete description',
            picPath: 'my test delete picname',
        };
        const bookmark = await db.Bookmark.create(GOLDEN_INFO);
        let testData = await db.Bookmark.destroy({
            where: {
                id: bookmark.dataValues.id,
            },
        });
        expect(testData).to.be.equal(1);
        testData = await db.Bookmark.findAll({
            where: {
                id: bookmark.dataValues.id,
            },
        });
        expect(testData.length).to.be.equal(0);
    });
});
