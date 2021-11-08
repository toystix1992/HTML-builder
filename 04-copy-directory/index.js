const path = require('path');
const fs = require('fs');
const pathToReadFile = path.join(__dirname, 'files/');
const pathTowriteFile = path.join(__dirname, 'files-copy/');


const  createClearDir = () => {
    fs.mkdir(pathTowriteFile, { recursive: true }, err => {
        if (err) throw err;
        console.log('папка file-copy успешно создана');
    });
    fs.readdir(pathTowriteFile, (err, files) => {
        if (err) {
            console.log('Папка пуста');
        }
        files.forEach(file => {
            console.log(file);
            fs.unlink(`${pathTowriteFile}${file}`, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log('файлы удалены');
            });
        });
    });
};

const copyFile = () => {
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
        });
    });
};

createClearDir();
copyFile();
