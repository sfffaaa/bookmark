'user strict';

const express = require('express');
const bodyParser = require('body-parser');

const registerApi = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

registerApi(app);

module.exports = app;
