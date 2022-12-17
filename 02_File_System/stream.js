const fs = require('fs');

const readStream = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./files/new-lorem.txt');

/** Use this methods in case the reading file is large */

/** Approach 1 */
/*
readStream.on('data', (dataChunk) => {
    writeStream.write(dataChunk);
});
*/
/** Approach 2 */
readStream.pipe(writeStream);