const path = require('path');
const fs = require('fs');

const pathToReadCssFiles = path.join(__dirname, 'styles/');
const pathToReadHtmlComponentsFiles = path.join(__dirname, 'components/');
const pathToReadHtmlTemplateFiles = path.join(__dirname, 'template.html');
const pathToReadAssetsFiles = path.join(__dirname, 'assets/');
const pathToWriteCssFiles = path.join(__dirname, 'project-dist/');
const pathToWriteAssetsFiles = path.join(__dirname, 'project-dist/assets/');
const writeableStream = fs.createWriteStream(`${pathToWriteCssFiles}style.css`);

fs.mkdir(pathToWriteCssFiles, { recursive: true }, err => {
    if (err) throw err;
    console.log('folder project-dist has already been created');
});


function makeCssBundle() {
    fs.readdir(pathToReadCssFiles, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            const extension = path.extname(file).slice(1);
            if (extension === 'css') {
                let readableStream = fs.createReadStream(`${pathToReadCssFiles}${file}`, "utf8");
                readableStream.pipe(writeableStream);
            }
        });
    });
}

const copyAssetsDirectory = (pathToReadAssetsFiles, pathToWriteAssetsFiles) => {
    fs.mkdir(pathToWriteAssetsFiles, { recursive: true }, err => {
        if (err) throw err;
        console.log('folder assets has already been created');
    });
    fs.readdir(pathToReadAssetsFiles, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            fs.stat(`${pathToReadAssetsFiles}${file}`, (err, stats) => {
                if (err) {
                    console.log(`File doesn't exist.`);
                } else {
                    if (stats.isDirectory()) {
                        return copyAssetsDirectory(path.join(__dirname, `assets/${file}/`), path.join(__dirname, `project-dist/assets/${file}/`));
                    }
                    fs.copyFile(`${pathToReadAssetsFiles}${file}`,
                        `${pathToWriteAssetsFiles}${file}`, (err) => {
                            if (err) throw err;
                            console.log('Asset file was copied');
                        });
                }
            });
        });
    }
    );
};

function makeHtmlBundle() {
    fs.copyFile(pathToReadHtmlTemplateFiles,
    `${pathToWriteCssFiles}index.html`, (err) => {
        if (err) throw err;
        console.log('Template file was copied');
    });
    writebleStreamMain = fs.createWriteStream()
    fs.readdir(pathToReadHtmlComponentsFiles, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(file => {
            console.log(file);
            let readableStreamComponents = fs.createReadStream(`${pathToReadHtmlComponentsFiles}${file}`, "utf8");
            readableStreamComponents.pipe(`${pathToWriteCssFiles}index.html`);
        });
    });

    // const readableStreamIndexHtml = fs.createReadStream(`${pathToWriteCssFiles}index.html`, "utf8");
    // readableStreamIndexHtml.on('data', function (chunk) {
    // });
}

copyAssetsDirectory(pathToReadAssetsFiles, pathToWriteAssetsFiles);
makeCssBundle();
makeHtmlBundle();
