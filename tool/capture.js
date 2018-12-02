/* global phantom */

/* eslint-disable-next-line import/no-unresolved */
const page = require('webpage').create();
/* eslint-disable-next-line import/no-unresolved */
const system = require('system');

const WIDTH = 1024;
const HEIGHT = 768;


if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename');
    phantom.exit(1);
}

const address = system.args[1];
const output = system.args[2];

/* eslint-disable-next-line prefer-arrow-callback */
page.open(address, function webCallback(status) {
    if (status !== 'success') {
        phantom.exit(1);
    } else {
        page.clipRect = {
            top: 0,
            left: 0,
            width: WIDTH,
            height: HEIGHT,
        };
        /* eslint-disable-next-line prefer-arrow-callback, func-names */
        setTimeout(function () {
            /* eslint-disable-next-line prefer-template */
            page.render(output + '.png', { format: 'png', quality: '100' });
            phantom.exit();
        }, 200);
    }
});
