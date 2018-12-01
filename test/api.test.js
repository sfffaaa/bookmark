/* global describe it */

const { expect } = require('chai');
const supertest = require('supertest');

const api = supertest('http://localhost:3000/api');


describe('api test', () => {
    it('Test create', (done) => {
        api.post('/create')
            .send({
                dummy: 'dummy',
            })
            .expect(200)
            .end((err, res) => {
                console.log(res);
                expect('qqq').to.be.a('number');
                if (err) {
                    done(err);
                }
                done();
            });
    });
});
