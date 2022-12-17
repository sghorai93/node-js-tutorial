const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        //await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promise_write.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promise_write.txt'), '\n\nI am appended Text.');
        await fsPromises.rename(path.join(__dirname, 'files', 'promise_write.txt'), path.join(__dirname, 'files', 'promise_complete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promise_complete.txt'), 'utf8');
        console.log(newData);

    } catch (err) {
        console.error(err);
    }
};

fileOps();