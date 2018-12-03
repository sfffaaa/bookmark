/* global describe it before after */
/* eslint-disable prefer-template, prefer-arrow-callback */

const phantomjs = require('phantomjs-prebuilt');
const { expect } = require('chai');
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

    before(function BeforeTest() {
        RemoveFolder(TESTFOLDER_PATH);
        CreateFolder(TESTFOLDER_PATH);
    });

    after(function AfterTest() {
        RemoveFolder(TESTFOLDER_PATH);
    });

    it('capture success test', function CaptureSuccessTest(done) {
        this.timeout(30000);
        const testImgPath = TESTFOLDER_PATH + '/success';
        const program = phantomjs.exec(
            CAPTURE_TOOL,
            'https://www.npmjs.com/package/phantomjs-prebuilt',
            testImgPath,
        );
        program.stdout.pipe(process.stdout);
        program.stderr.pipe(process.stderr);
        program.on('close', (code) => {
            if (code) {
                return done(code);
            }
            const testData = fs.readFileSync(testImgPath + '.png');
            const goldenData = fs.readFileSync('test/data/capture.success.png');
            expect(goldenData.equals(testData)).to.equal(true);
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
