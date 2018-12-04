/* global describe it before after */
/* eslint-disable prefer-template, prefer-arrow-callback */

const phantomjs = require('phantomjs-prebuilt');
const { expect } = require('chai');
const { spawn } = require('child_process');
const fs = require('fs');

function CreateFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        return;
    }
    fs.mkdirSync(folderPath);
}

function RemoveFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        return;
    }
    /* eslint-disable-next-line no-unused-vars */
    fs.readdirSync(folderPath).forEach(function ReadAllDirEach(file, index) {
        const curPath = folderPath + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
            RemoveFolder(curPath);
        } else {
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(folderPath);
}

describe('tool for capture test', () => {
    const TESTFOLDER_PATH = 'test/tmp';
    const CAPTURE_TOOL = 'tool/capture.js';
    let fakeServerProcess;

    before(function BeforeTest() {
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);

        fakeServerProcess = spawn('node', ['test/fake.server.js']);
    });

    after(function AfterTest() {
        RemoveFolder(TESTFOLDER_PATH);
        fakeServerProcess.kill('SIGTERM');
    });

    it('capture success test', function CaptureSuccessTest(done) {
        this.timeout(30000);
        const testImgPath = TESTFOLDER_PATH + '/success';
        const program = phantomjs.exec(
            CAPTURE_TOOL,
            'http://localhost:4444',
            testImgPath,
        );
        program.stdout.pipe(process.stdout);
        program.stderr.pipe(process.stderr);
        program.on('close', (code) => {
            if (code) {
                return done(code);
            }
            const LIMIT = 300;
            const testData = fs.readFileSync(testImgPath + '.png').toString('hex');
            const goldenData = fs.readFileSync('test/data/capture.success.png').toString('hex');
            expect(testData.length).to.equal(goldenData.length);
            for (let i = 0; i < testData.length / LIMIT; i += 1) {
                const testSubData = testData.substring(LIMIT * i, LIMIT * (i + 1));
                const goldenSubData = goldenData.substring(LIMIT * i, LIMIT * (i + 1));
                expect(testSubData).to.equal(goldenSubData, 'idx: ' + i);
            }
            return done();
        });
    });

    it('capture failure test', function CaptureFailureTest(done) {
        this.timeout(30000);
        const testImgPath = TESTFOLDER_PATH + '/failure';
        const program = phantomjs.exec(
            CAPTURE_TOOL,
            'https://aa.bb.cc',
            testImgPath,
        );
        program.stdout.pipe(process.stdout);
        program.stderr.pipe(process.stderr);
        program.on('close', (code) => {
            if (!code) {
                return done(1);
            }
            expect(fs.existsSync(testImgPath + '.png')).to.equal(false);
            return done();
        });
    });
});