/* global describe it before after */

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

    before(async function BeforeTest() {
        this.timeout(3000);
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);

        fakeServerProcess = spawn('node', [FAKE_SERVER_PATH]);
        await Sleep(1000);
    });

    after(() => {
        RemoveFolder(TESTFOLDER_PATH);
        fakeServerProcess.kill('SIGTERM');
    });

    it('GetURLInfoPromise failure test', function GetURLInfoPromiseFailureTest(done) {
        this.timeout(30000);
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
    });

    it('GetURLInfoPromise success test', function GetURLInfoPromiseSuccessTest(done) {
        this.timeout(30000);

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
    });
});
