const path = require('path');
const fs = require('fs');
const pathToReadFile = path.join(__dirname, 'files/');
const pathTowriteFile = path.join(__dirname, 'files-copy/');


const copyFilesInDirectory = () => {
    fs.mkdir(pathTowriteFile, { recursive: true }, err => {
        if (err) throw err;
        console.log('Все папки успешно созданы');
    });
    fs.readdir(pathToReadFile, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            fs.copyFile(`${pathToReadFile}${file}`,
                `${pathTowriteFile}${file}`, (err) => {
                    if (err) throw err;
                    console.log('files was copied');
                });
        })
    });
}

copyFilesInDirectory();



