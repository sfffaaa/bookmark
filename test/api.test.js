/* global describe it beforeEach afterEach before after */

const request = require('supertest');
const async = require('async');
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

    beforeEach(async function Before() {
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

    it('Test list', function TestList(done) {
        this.timeout(2000);
        api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end(async (err, res) => {
                expect(err).to.equal(null);
                expect(res.body.success).to.equal(true);
                const goldenData = await db.Bookmark.findAll({});
                expect(res.body.data.length).to.equal(goldenData.length);
                for (let dataIdx = 0; dataIdx < goldenData.length; dataIdx += 1) {
                    for (let keyIdx = 0; keyIdx < DATA_KEYS.length; keyIdx += 1) {
                        const goldenValue = goldenData[dataIdx].dataValues[DATA_KEYS[keyIdx]];
                        const testValue = res.body.data[dataIdx][DATA_KEYS[keyIdx]];
                        expect(testValue).to.be.equal(goldenValue,
                            `${dataIdx} ${DATA_KEYS[keyIdx]}: ${testValue} v.s. ${goldenValue}`);
                    }
                }
                return done();
            });
    });

    it('Test create', function TestCreate(done) {
        this.timeout(12000);
        async.series([
            function ResetSeed(next) {
                ResetSeedTestDBPromise().then(() => {
                    next();
                });
            },
            function CreateAPI(next) {
                api.post('/api/create')
                    .send({ url: 'http://localhost:4444' })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).to.equal(null);
                        expect(res.body.success).to.equal(true);
                        next(err, res.body);
                    });
            },
            function ListAPI(next) {
                api.post('/api/list')
                    .send({ dummy: 'dummy' })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).to.equal(null);
                        expect(res.body.success).to.equal(true);
                        expect(res.body.data.length).to.be.equal(1);
                        const bookmark = res.body.data[0];
                        expect(bookmark.title).to.be.equal('test title');
                        expect(bookmark.description).to.be.equal('test description');
                        expect(bookmark.url).to.be.equal('http://localhost:4444');
                        expect(fs.existsSync(bookmark.picPath)).to.equal(true);
                        next(err, res.body);
                    });
            },
        /* eslint-disable-next-line no-unused-vars */
        ], (err, results) => {
            done();
        });
    });

    it('Test create duplicate', function TestCreate(done) {
        this.timeout(15000);
        async.series([
            function ResetSeed(next) {
                ResetSeedTestDBPromise().then(() => {
                    next();
                });
            },
            function CreateAPI(next) {
                api.post('/api/create')
                    .send({ url: 'http://localhost:4444' })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).to.equal(null);
                        expect(res.body.success).to.equal(true);
                        next(err, res.body);
                    });
            },
            function CreateAPI(next) {
                api.post('/api/create')
                    .send({ url: 'http://localhost:4444' })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).to.equal(null);
                        expect(res.body.success).to.equal(false);
                        expect(res.body.err).to.equal('Validation error');
                        next(err, res.body);
                    });
            },
        /* eslint-disable-next-line no-unused-vars */
        ], (err, results) => {
            done();
        });
    });

    it('Test edit', (done) => {
        api.post('/api/edit')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res.body.success).to.equal(false);
                return done();
            });
    });

    it('Test delete', (done) => {
        api.post('/api/delete')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res.body.success).to.equal(false);
                return done();
            });
    });

    it('Test brief', (done) => {
        api.post('/api/brief')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res.body.success).to.equal(false);
                return done();
            });
    });
});
