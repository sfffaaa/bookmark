'user strict';

const express = require('express');
const bodyParser = require('body-parser');

const registerApi = require('./api');

const app = express();

app.use(express.static(`${__dirname}/../build`));
app.use('/data', express.static(`${__dirname}/../data`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

registerApi(app);

module.exports = app;
