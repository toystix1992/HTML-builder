const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');
const fs = require('fs');


const pathToReadCssFiles = path.join(__dirname, 'styles/');
const pathToReadHtmlComponentsFiles = path.join(__dirname, 'components/');
const pathToReadHtmlTemplateFiles = path.join(__dirname, 'template.html');
const pathToReadAssetsFiles = path.join(__dirname, 'assets/');
const pathToWriteCssFiles = path.join(__dirname, 'project-dist/');
const pathToWriteAssetsFiles = path.join(__dirname, 'project-dist/assets/');
const writeableStreamCss = fs.createWriteStream(`${pathToWriteCssFiles}style.css`);


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
                readableStream.pipe(writeableStreamCss);
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
                            if (err) {
                                console.log('assets');
                                throw err;
                            }
                            console.log('Asset file was copied');
                        });
                }
            });
        });
    }
    );
};



async function makeHtmlBundle() {
    let templateStr = await readFile(pathToReadHtmlTemplateFiles, 'utf8');
    const files = await readdir(pathToReadHtmlComponentsFiles);
    const temp = [];

    for await (const file of files) {
        const text = await readFile(`${pathToReadHtmlComponentsFiles}${file}`, 'utf8');
        const fileName = file.replace('.html', '');
        temp.push([fileName, text]);
    }

    for (const [variableInTemplate, htmlText] of temp) {
        templateStr = templateStr.replace(`{{${variableInTemplate}}}`, htmlText);
    }

    await writeFile(`${pathToWriteCssFiles}index.html`, templateStr);
    console.log('The file has been saved!');
}

copyAssetsDirectory(pathToReadAssetsFiles, pathToWriteAssetsFiles);
makeCssBundle();
makeHtmlBundle();
