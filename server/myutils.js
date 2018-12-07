const crypto = require('crypto');
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');

function ComposePicName(url) {
    return crypto.createHash('md5').update(url).digest('hex');
}

function GetURLInfoPromise(url) {
    const CAPTURE_TOOL_PATH = 'tool/capture.js';
    const picPath = path.join('data/img', `${ComposePicName(url)}.png`);
    return new Promise((resolve, reject) => {
        const program = phantomjs.exec(
            CAPTURE_TOOL_PATH,
            url,
            picPath,
        );
        let captureResult;
        program.stdout.on('data', (dataBuf) => {
            captureResult += dataBuf.toString();
        });
        program.on('close', (code) => {
            if (code) {
                reject(Error(`return code "${code}" fails`));
                return;
            }
            const titles = captureResult.match(/title: "(.*?)"/);
            if (titles.length === 0) {
                reject(Error(`title has error response ${captureResult}`));
                return;
            }
            const descripts = captureResult.match(/description: "(.*?)"/);
            if (descripts.length === 0) {
                reject(Error(`descriptions has error response ${captureResult}`));
                return;
            }
            resolve({
                title: titles[1],
                description: descripts[1],
                picPath,
                url,
            });
        });
    });
}

module.exports = {
    GetURLInfoPromise,
};
