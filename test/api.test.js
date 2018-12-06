/* global describe it before after */

const request = require('supertest');
const { expect } = require('chai');
const myserver = require('../server/server');
const db = require('../models');
const { ResetTestDB, SetDefaultTestDB } = require('./testutils');


const api = request(myserver);
const DATA_KEYS = ['url', 'title', 'description', 'picName', 'id'];


describe('api test', () => {
    before(async function Before() {
        this.timeout(3000);
        expect(process.env.NODE_ENV).to.be.equal('test');
        await ResetTestDB();
        await SetDefaultTestDB();
    });

    after(async () => {
        await ResetTestDB();
    });

    it('Test list', function TestList(done) {
        this.timeout(2000);
        api.post('/api/list')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
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


    it('Test create', (done) => {
        api.post('/api/create')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.success).to.equal(false);
                return done();
            });
    });

    it('Test edit', (done) => {
        api.post('/api/edit')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.success).to.equal(false);
                return done();
            });
    });

    it('Test delete', (done) => {
        api.post('/api/delete')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.success).to.equal(false);
                return done();
            });
    });

    it('Test brief', (done) => {
        api.post('/api/brief')
            .send({ dummy: 'dummy' })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.success).to.equal(false);
                return done();
            });
    });
});
