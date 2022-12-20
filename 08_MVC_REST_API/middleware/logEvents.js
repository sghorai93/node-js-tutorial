const { format } = require('date-fns');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const SERVER_LOG = 'Server_Log.txt';

const logEvents = async (message, logName) => {
    const dateTimeFormat = `${format(new Date(), 'dd-MM-yyyy  HH:mm:ss')}`;
    const logItem = `${dateTimeFormat}  - ${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
        console.log(message);
    } catch (err) {
        console.error(err);
    }

};

const logger = (req, res, next) => {
    logEvents(`${req.method} - ${req.header.origin} - ${req.url}`, SERVER_LOG);
    next();
};

module.exports = { logger, logEvents };