/* global describe it before after */
/* eslint-disable prefer-template, prefer-arrow-callback */

const { expect } = require('chai');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const phantomjs = require('phantomjs-prebuilt');
const { RemoveFolder, CreateFolder, Sleep } = require('./testutils');

describe('tool for capture test', () => {
    const TESTFOLDER_PATH = 'test/tmp';
    const CAPTURE_TOOL_PATH = 'tool/capture.js';
    const FAKE_SERVER_PATH = 'test/fake.server.js';
    let fakeServerProcess;

    before(async function BeforeTest() {
        this.timeout(3000);
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);

        fakeServerProcess = spawn('node', [FAKE_SERVER_PATH]);
        await Sleep(1000);
    });

    after(function AfterTest() {
        RemoveFolder(TESTFOLDER_PATH);
        fakeServerProcess.kill('SIGTERM');
    });

    it('capture success test', function CaptureSuccessTest(done) {
        this.timeout(30000);

        const goldenTitle = 'test title';
        const goldenDesc = 'test description';

        const testImgPath = path.join(TESTFOLDER_PATH, 'success');
        const program = phantomjs.exec(
            CAPTURE_TOOL_PATH,
            'http://localhost:4444',
            testImgPath,
        );
        let captureResult;
        program.stdout.on('data', (dataBuf) => {
            captureResult += dataBuf.toString();
        });
        program.on('close', (code) => {
            if (code) {
                return done(code);
            }
            const titles = captureResult.match(/title: "(.*?)"/);
            expect(titles.length).to.be.above(0);
            expect(titles[1]).to.be.equal(goldenTitle);

            const descripts = captureResult.match(/description: "(.*?)"/);
            expect(descripts.length).to.be.above(0);
            expect(descripts[1]).to.be.equal(goldenDesc);

            // const LIMIT = 300;
            // const testData = fs.readFileSync(testImgPath).toString('hex');
            // const goldenData = fs.readFileSync('test/data/capture.success.png').toString('hex');
            // expect(testData.length).to.equal(goldenData.length);
            // for (let i = 0; i < testData.length / LIMIT; i += 1) {
            //     const testSubData = testData.substring(LIMIT * i, LIMIT * (i + 1));
            //     const goldenSubData = goldenData.substring(LIMIT * i, LIMIT * (i + 1));
            //     expect(testSubData).to.equal(goldenSubData, 'idx: ' + i);
            // }
            return done();
        });
    });

    it('capture failure test', function CaptureFailureTest(done) {
        this.timeout(30000);
        const testImgPath = path.join(TESTFOLDER_PATH, 'failure');
        const program = phantomjs.exec(
            CAPTURE_TOOL_PATH,
            'https://aa.bb.cc',
            testImgPath,
        );
        program.on('close', (code) => {
            if (!code) {
                return done(1);
            }
            expect(fs.existsSync(testImgPath)).to.equal(false);
            return done();
        });
    });
});
