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
});
