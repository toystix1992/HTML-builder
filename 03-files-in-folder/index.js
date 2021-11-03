const path = require('path');
const fs = require('fs');

const pathToFiles = path.join(__dirname, 'secret-folder/');

function seekFile(pathToFiles) {
    fs.readdir(pathToFiles, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            fs.stat(`${pathToFiles}${file}`, (err, stats) => {
                if (err) {
                    console.log(`File doesn't exist.`);
                } else {
                    if (stats.isDirectory()) {
                        return seekFile(path.join(__dirname, `secret-folder/${file}/`));
                    } if (!stats.isDirectory() && stats.size !== 0) {
                        const name = file.replace(/\.[^/.]+$/, "");
                        const extension = path.extname(file).slice(1);
                        console.log(`${name} - ${extension} - ${stats.size / 1000}kb`);
                    }
                }
            });
        });
    });
}

seekFile(pathToFiles);
