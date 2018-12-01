'user strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json({
        success: false,
    });
});

app.post('/api/create', async (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/edit', async (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/list', async (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/delete', async (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/brief', async (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});


module.exports = app;
