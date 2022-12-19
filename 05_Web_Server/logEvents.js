const { format } = require('date-fns');
const { v4 : uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTimeFormat = `${format(new Date(), 'dd-MM-yyyy  HH:mm:ss')}`;
    const logItem = `${dateTimeFormat} - ${uuid()} - ${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
        console.log(message);
    } catch (err) {
        console.error(err);
    }

};

const localhostAccessLog = async (request) => {
    const message = `${request.method} -- ${request.url}`;
    const dateTimeFormat = `${format(new Date(), 'dd-MM-yyyy  HH:mm:ss')}`;
    const logItem = `${dateTimeFormat} - ${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', 'LocalhostAccessLog.txt'), logItem);
        console.log(message);
    } catch (err) {
        console.error(err);
    }

};


module.exports = { logEvents, localhostAccessLog };