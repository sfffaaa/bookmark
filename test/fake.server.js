'user strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('test/fake.server'));

app.get('/', async (req, res) => {
    res.send('<html>'
        + '<title>test title</title>'
        + '<meta name="description" content="test description"/>'
        + '<img src="http://localhost:4444/Ethereum-Price-Up.jpg">test</img>'
        + '</html>');
});

const port = process.env.PORT || 4444;

app.listen(port, () => {
    console.log('Server running on port %d', port);
});
