/* global describe it */

const request = require('supertest');
const { expect } = require('chai');
const myserver = require('../server/server');


const api = request(myserver);


describe('api test', () => {
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

    it('Test list', (done) => {
        api.post('/api/list')
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
