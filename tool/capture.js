/* global phantom, document */
/* eslint-disable import/no-unresolved, prefer-arrow-callback, prefer-template */

const page = require('webpage').create();
const system = require('system');

const WIDTH = 1024;
const HEIGHT = 768;
page.viewportSize = { width: WIDTH, height: HEIGHT };


if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename');
    phantom.exit(1);
}

const address = system.args[1];
const output = system.args[2];

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
        setTimeout(function TimeOut() {
            const title = page.evaluate(function GetTitle() {
                return document.title;
            });
            const descript = page.evaluate(function GetDescript() {
                /* eslint-disable-next-line no-var */
                var i = 0;
                const metas = document.getElementsByTagName('meta');
                for (i = 0; i < metas.length; i += 1) {
                    if (metas[i].getAttribute('itemprop') === 'description'
                        || metas[i].getAttribute('name') === 'description') {
                        return metas[i].getAttribute('content');
                    }
                }
                return document.body.textContent.substring(0, 100) + '...';
            });

            page.render(output, { format: 'png', quality: '100' });
            console.log('----------------------------');
            console.log('title: "' + title + '"');
            console.log('description: "' + descript + '"');
            console.log('pic: "' + output + '"');
            phantom.exit();
        }, 200);
    }
});
