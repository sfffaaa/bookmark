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
const EXEC = util.promisify(childProcess.exec);

module.exports = {
    ResetTestDB: async function ResetTestDB() {
        if (fs.existsSync(TESTDATABASE_PATH)) {
            await EXEC(`${SEQUELIZE_PATH} db:migrate:undo:all --env test`, { env: process.env });
        }
    },
    SetDefaultTestDB: async function SetDefaultDB() {
        await EXEC(`${SEQUELIZE_PATH} db:migrate --env test`, { env: process.env });
        await EXEC(`${SEQUELIZE_PATH} db:seed:all --env test`, { env: process.env });
    },
    Sleep: function Sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
};
