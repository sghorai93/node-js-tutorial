const { logEvents } = require('./logEvents');

const ERROR_LOG = 'Error_Log.txt';

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    logEvents(`${err.name} : ${err.message} : ${err.stack}`, ERROR_LOG);
    res.status(500).send(err.message);
};

module.exports = errorHandler;