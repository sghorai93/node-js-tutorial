const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const { logEvents, localhostAccessLog} = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter { };
const emitterObj =  new Emitter();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    localhostAccessLog(req);
});


server.listen(PORT, () => {
    logEvents(`Web Server is running on port : ${PORT}`);
});


/*
emitterObj.on('log', (msg) => logEvents(msg));
emitterObj.emit('log', 'Log Event Emitted!');
*/