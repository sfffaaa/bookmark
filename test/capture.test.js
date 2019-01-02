/* global describe test beforeAll afterAll */
/* eslint-disable prefer-template, prefer-arrow-callback */

const { expect } = require('chai');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const phantomjs = require('phantomjs-prebuilt');
const {
    RemoveFolder, CreateFolder, Sleep, PARAM,
} = require('./testutils');

describe('tool for capture test', () => {
    const TESTFOLDER_PATH = 'test/tmp';
    const CAPTURE_TOOL_PATH = 'tool/capture.js';
    const FAKE_SERVER_PATH = 'test/fake.server.js';
    let fakeServerProcess;

    beforeAll(async function BeforeTest() {
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);

        fakeServerProcess = spawn('node', [FAKE_SERVER_PATH]);
        await Sleep(1000);
    }, 3000);

    afterAll(function AfterTest() {
        RemoveFolder(TESTFOLDER_PATH);
        fakeServerProcess.kill('SIGTERM');
    });

    test('capture success test', async function CaptureSuccessTest(done) {
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
            expect(code).to.equal(0);
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
    }, 30000);

    test('capture failure test', async function CaptureFailureTest(done) {
        const testImgPath = path.join(TESTFOLDER_PATH, 'failure');
        const program = phantomjs.exec(
            CAPTURE_TOOL_PATH,
            PARAM.fakeURL,
            testImgPath,
        );
        program.on('close', (code) => {
            expect(code).to.not.equal(0);
            expect(fs.existsSync(testImgPath)).to.equal(false);
            return done();
        });
    }, 30000);
});
