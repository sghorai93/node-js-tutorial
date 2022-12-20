const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

//Custom Middleware Logger
app.use(logger);

const whiteList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3000'];
const corsOption = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));

/**
 * Built-in middleware to handle urlencoded data.
 * Content-Type: application/x-www-form-urlencoded
 */
app.use(express.urlencoded({extended: false}));

//Build-in middleware for json
app.use(express.json());

//Serves custom static files to root
/**
 * Equivalent - 
 * app.use('/', express.static(path.join(__dirname, '/public')));
 */
app.use(express.static(path.join(__dirname, '/public')));

//Serves custom static files to subdir
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({ error : "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Web Server is running on port : ${PORT}`));