const path = require('path');
const fs = require('fs');
const process = require('process');
const pathToFile = path.join(__dirname, 'text.txt');
const wStream = fs.createWriteStream(pathToFile);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.open(pathToFile, 'w', (err) => {
  if (err) throw err;
});


function stopWriteText() {
  console.log('aaaaa, dude are you serious???');
  rl.close();
}


function addText() {
  rl.question('who is the best of the best of the best? ', (userInput) => {
    if (userInput.trim().toLowerCase() === 'exit') {
      stopWriteText();
    } else {
      wStream.write(`${userInput} \n`);
      addText();
    }
  });
}

rl.on('close', () => {
  console.log('\n see you soon!');
});
addText();


