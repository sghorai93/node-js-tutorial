const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const ERROR_LOG = 'errLog.txt';
const REQUEST_LOG = 'reqLog.txt';

/**
 * Built-in middleware to handle urlencoded data.
 * Content-Type: application/x-www-form-urlencoded
 */
app.use(express.urlencoded({extended: false}));

//Build-in middleware for json
app.use(express.json());

//Serves custom static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

/**
 * Route Handlers
 */
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next();
}, (req, res) => {
    res.send("Hello...");
});

/**
 * Chaining Route Handlers
 */
const one = (req, res, next) => {
    console.log('One');
    next();
};
const two = (req, res, next) => {
    console.log('Two');
    next();
};
const three = (req, res) => {
    console.log('Three');
    res.send('Finished.');
};
app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(PORT, () => console.log(`Web Server is running on port : ${PORT}`));