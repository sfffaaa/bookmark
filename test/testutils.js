const path = require('path');
const fs = require('fs');
const util = require('util');
const childProcess = require('child_process');

function ResolvePath(inputPath) {
    const basenamePath = path.basename(__dirname);
    if (basenamePath === 'test') {
        return path.resolve(`${__dirname}/../${inputPath}`);
    }
    return path.resolve(`${__dirname}/${inputPath}`);
}

const SEQUELIZE_PATH = ResolvePath('node_modules/.bin/sequelize');
const TESTDATABASE_PATH = ResolvePath('data/test-db.sqlite3');

module.exports = {
    RemoveTestDBSync: function RemoveTestDBSync() {
        if (fs.existsSync(TESTDATABASE_PATH)) {
            fs.unlinkSync(TESTDATABASE_PATH);
        }
    },
    SetDefaultTestDB: async function SetDefaultDB() {
        const exec = util.promisify(childProcess.exec);

        await exec(`${SEQUELIZE_PATH} db:migrate --env test`, { env: process.env });
        await exec(`${SEQUELIZE_PATH} db:seed:all --env test`, { env: process.env });
    },
    Sleep: function Sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
};
