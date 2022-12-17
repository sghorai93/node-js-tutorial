const fs = require('fs');

const DIRECTORY_NAME = './createdDirectory';
if(!fs.existsSync(DIRECTORY_NAME)) {
    fs.mkdir(DIRECTORY_NAME, (err) => {
        if(err) throw err;
        console.log("Folder Created...");
    });
};

if(fs.existsSync(DIRECTORY_NAME)) {
    fs.rmdir(DIRECTORY_NAME, (err) => {
        if(err) throw err;
        console.log("Folder Deleted...");
    });
};
