/* global describe it beforeEach afterEach before after */

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

    before(async function Before() {
        this.timeout(6000);
        fakeServerProcess = spawn('node', [FAKE_SERVER_PATH]);
        await Sleep(1000);
    });

    after(async () => {
        fakeServerProcess.kill('SIGTERM');
    });

    beforeEach(async function BeforeEach() {
        this.timeout(6000);
        await ResetTestDB();
        await SetDefaultTestDB();

        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);
    });

    afterEach(async () => {
        await ResetTestDB();
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);
    });

    it('Test list', async function TestList() {
        this.timeout(2000);
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
    });

    it('Test create', async function TestCreate() {
        this.timeout(12000);
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
    });

    it('Test create duplicate', async function TestCreate() {
        this.timeout(15000);
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
    });

    it('Test edit', async function TestEdit() {
        this.timeout(3000);
        const res = await api.post('/api/edit')
            .send({ dummy: 'dummy' })
            .expect(200)
            .catch((err) => {
                console.error(err);
                throw err;
            });
        expect(res.body.success).to.equal(false);
    });

    it('Test delete id', async function TestDeleteID() {
        this.timeout(16000);
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
    });

    it('Test delete URL', async function TestDeleteURL() {
        this.timeout(16000);
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
    });

    it('Test delete unexist', async function TestDeleteInexist() {
        this.timeout(16000);
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
    });

    it('Test upgrade ID', async function TestUpgradeID() {
        this.timeout(16000);
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
    });

    it('Test upgrade URL', async function TestUpgradeURL() {
        this.timeout(16000);
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
    });

    it('Test upgrade nonexistent', async function TestUpgradeNonexist() {
        this.timeout(16000);
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
    });
});
