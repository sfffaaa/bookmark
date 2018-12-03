'user strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send('<html>'
        + '<img src="https://www.google.nl/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png">test</img>'
        + '</html>');
});

const port = process.env.PORT || 4444;

app.listen(port, () => {
    console.log('Server running on port %d', port);
});
