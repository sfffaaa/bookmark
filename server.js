const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        success: false,
    });
});

app.post('/api/create', (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/edit', (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/list', (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/delete', (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});

app.post('/api/brief', (req, res) => {
    // [TODO] Need implement
    res.json({
        success: false,
    });
});


app.listen(port, () => {
    console.log('Node js Express js Tutorial');
});
