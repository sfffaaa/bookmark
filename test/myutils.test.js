/* global describe test beforeAll afterAll */

const { expect } = require('chai');
const { spawn } = require('child_process');
const fs = require('fs');

const {
    RemoveFolder, CreateFolder, Sleep, ResolvePath, PARAM,
} = require('./testutils');
const { GetURLInfoPromise } = require('../server/myutils');

describe('my utils test', () => {
    const TESTFOLDER_PATH = ResolvePath('data/img');
    const FAKE_SERVER_PATH = 'test/fake.server.js';
    let fakeServerProcess;

    beforeAll(async () => {
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);

        fakeServerProcess = spawn('node', [FAKE_SERVER_PATH]);
        await Sleep(1000);
    });

    afterAll(() => {
        RemoveFolder(TESTFOLDER_PATH);
        fakeServerProcess.kill('SIGTERM');
    });

    test('GetURLInfoPromise failure test', (done) => {
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);

        const url = PARAM.fakeURL;
        /* eslint-disable-next-line no-unused-vars */
        GetURLInfoPromise(url).then((data) => {
            done(1);
        }).catch((err) => {
            expect(err.message).to.be.equal('return code "1" fails');
            expect(fs.readdirSync(TESTFOLDER_PATH).length).to.be.equal(0);
            done();
        });
    }, 30000);

    test('GetURLInfoPromise success test', (done) => {
        const goldenTitle = 'test title';
        const goldenDesc = 'test description';
        const url = 'http://localhost:4444';
        GetURLInfoPromise(url).then((data) => {
            expect(data.title).to.be.equal(goldenTitle);
            expect(data.description).to.be.equal(goldenDesc);
            expect(data.url).to.be.equal(url);
            expect(fs.existsSync(data.picPath)).to.equal(true);
            done();
        });
    }, 30000);
});
