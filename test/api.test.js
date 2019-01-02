/* global describe test beforeEach afterEach beforeAll afterAll */

const request = require('supertest');
const fs = require('fs');
const { expect } = require('chai');
const { spawn } = require('child_process');
const myserver = require('../server/server');
const db = require('../models');

const {
    RemoveFolder, CreateFolder, Sleep, ResolvePath,
} = require('./testutils');
const { ResetTestDB, SetDefaultTestDB, ResetSeedTestDBPromise } = require('./testutils');


const api = request(myserver);
const DATA_KEYS = ['url', 'title', 'description', 'picPath', 'id'];

function TestFakeServer(bookmark) {
    expect(bookmark.title).to.be.equal('test title');
    expect(bookmark.description).to.be.equal('test description');
    expect(bookmark.url).to.be.equal('http://localhost:4444');
    expect(fs.existsSync(bookmark.picPath)).to.equal(true);
}

describe('api test', () => {
    const TESTFOLDER_PATH = ResolvePath('data/img');
    const FAKE_SERVER_PATH = 'test/fake.server.js';
    let fakeServerProcess;

    beforeAll(async () => {
        expect(process.env.NODE_ENV).to.be.equal('test');
        fakeServerProcess = spawn('node', [FAKE_SERVER_PATH]);
        await Sleep(1000);
    }, 6000);

    afterAll(async () => {
        fakeServerProcess.kill('SIGTERM');
    });

    beforeEach(async () => {
        await ResetTestDB();
        await SetDefaultTestDB();

        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);
    }, 6000);

    afterEach(async () => {
        await ResetTestDB();
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);
    });

    test('Test list', async () => {
        const goldenData = await db.Bookmark.findAll({});
        const result = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(result.body.success).to.equal(true);
        const testData = result.body.data;
        expect(testData.length).to.equal(goldenData.length);
        for (let dataIdx = 0; dataIdx < goldenData.length; dataIdx += 1) {
            for (let keyIdx = 0; keyIdx < DATA_KEYS.length; keyIdx += 1) {
                const goldenValue = goldenData[dataIdx].dataValues[DATA_KEYS[keyIdx]];
                const testValue = testData[dataIdx][DATA_KEYS[keyIdx]];
                expect(testValue).to.be.equal(goldenValue,
                    `${dataIdx} ${DATA_KEYS[keyIdx]}: ${testValue} v.s. ${goldenValue}`);
            }
        }
    }, 2000);

    test('Test create', async () => {
        await ResetSeedTestDBPromise();
        let result = await api.post('/api/create')
            .send({ url: 'http://localhost:4444' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(result.body.success).to.equal(true);
        result = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(result.body.success).to.equal(true);
        expect(result.body.data.length).to.be.equal(1);
        const bookmark = result.body.data[0];
        TestFakeServer(bookmark);
    }, 12000);

    test('Test create duplicate', async () => {
        await ResetSeedTestDBPromise();
        let res = await api.post('/api/create')
            .send({ url: 'http://localhost:4444' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        res = await api.post('/api/create')
            .send({ url: 'http://localhost:4444' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(false);
        expect(res.body.err).to.equal('Validation error');
    }, 15000);

    test('Test delete id', async () => {
        await ResetSeedTestDBPromise();
        let res;

        res = await api.post('/api/create')
            .send({ url: 'http://localhost:4444' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        const bookmark = res.body.data[0];
        TestFakeServer(bookmark);
        const nowPicPath = bookmark.picPath;
        const bookmarkId = bookmark.id;

        res = await api.post('/api/delete')
            .send({ id: bookmarkId })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(0);
        expect(fs.existsSync(nowPicPath)).to.equal(false);
    }, 16000);

    test('Test delete URL', async () => {
        await ResetSeedTestDBPromise();
        const bookmarkURL = 'http://localhost:4444';
        let res;

        res = await api.post('/api/create')
            .send({ url: bookmarkURL })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        const bookmark = res.body.data[0];
        TestFakeServer(bookmark);
        const nowPicPath = bookmark.picPath;

        res = await api.post('/api/delete')
            .send({ url: bookmarkURL })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(0);
        expect(fs.existsSync(nowPicPath)).to.equal(false);
    }, 16000);

    test('Test delete unexist', async () => {
        const bookmarkURL = 'http://localhost:4444';
        await ResetSeedTestDBPromise();

        let res;
        res = await api.post('/api/create')
            .send({ url: bookmarkURL })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        TestFakeServer(res.body.data[0]);

        res = await api.post('/api/delete')
            .send({ url: 'http://aa.bb.cc' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/delete')
            .send({ id: 1122 })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        TestFakeServer(res.body.data[0]);
    }, 16000);

    test('Test upgrade ID', async () => {
        let res;
        res = await ResetSeedTestDBPromise();

        const bookmarkURL = 'http://localhost:4444';
        res = await api.post('/api/create')
            .send({ url: bookmarkURL })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        const bookmarkOld = res.body.data[0];
        TestFakeServer(bookmarkOld);

        res = await api.post('/api/upgrade')
            .send({ id: bookmarkOld.id })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        const bookmarkNew = res.body.data[0];
        TestFakeServer(bookmarkNew);
        expect(new Date(bookmarkNew.updatedAt)).to.above(new Date(bookmarkOld.updatedAt));
    }, 16000);

    test('Test upgrade URL', async () => {
        let res;
        res = await ResetSeedTestDBPromise();

        const bookmarkURL = 'http://localhost:4444';
        res = await api.post('/api/create')
            .send({ url: bookmarkURL })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        const bookmarkOld = res.body.data[0];
        TestFakeServer(bookmarkOld);

        res = await api.post('/api/upgrade')
            .send({ url: bookmarkOld.url })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        const bookmarkNew = res.body.data[0];
        TestFakeServer(bookmarkNew);
        expect(new Date(bookmarkNew.updatedAt)).to.above(new Date(bookmarkOld.updatedAt));
    }, 16000);

    test('Test upgrade nonexistent', async () => {
        let res;
        res = await ResetSeedTestDBPromise();

        const bookmarkURL = 'http://localhost:4444';
        res = await api.post('/api/create')
            .send({ url: bookmarkURL })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        TestFakeServer(res.body.data[0]);

        res = await api.post('/api/upgrade')
            .send({ id: 5566 })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(false);

        res = await api.post('/api/upgrade')
            .send({ url: 'http://aa.bb.cc' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(false);

        res = await api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(true);
        expect(res.body.data.length).to.be.equal(1);
        TestFakeServer(res.body.data[0]);
    }, 16000);
});
