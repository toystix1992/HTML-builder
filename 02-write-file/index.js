const path = require('path');
const fs = require('fs');
const process = require('process');

const pathToFile = path.join(__dirname, 'text.txt');
fs.open(pathToFile, 'w', (err) => {
  if(err) throw err;
});




// process.on('beforeExit', () => {
//   console.log('goodbye');
// });
function stopWriteText () {
  console.log("goodbye");
  process.exit();
}



function addText() {
  process.stdin.resume();
  console.log("Tel me something!");
  process.stdin.on( "data", function(data) {
    console.log("something more!");
    fs.appendFile(pathToFile, data, function(error){
      if(error) throw error;
    });
  });
  process.on('exit', () => {
    console.log('safsaf');
  });
}

addText();


