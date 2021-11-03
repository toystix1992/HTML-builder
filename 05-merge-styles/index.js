const path = require('path');
const fs = require('fs');

const pathToReadFiles = path.join(__dirname, 'styles/');
const pathToWriteFiles = path.join(__dirname, 'project-dist/');
let writeableStream = fs.createWriteStream(`${pathToWriteFiles}bundle.css`);


function makeBundle() {
    fs.readdir(pathToReadFiles, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            const extension = path.extname(file).slice(1);
            if (extension === 'css') {
                let readableStream = fs.createReadStream(`${pathToReadFiles}${file}`, "utf8");
                readableStream.pipe(writeableStream);
            }
        });
    });
}

makeBundle();
