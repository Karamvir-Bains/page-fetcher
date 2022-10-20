const request = require("request");
const fs = require("fs");
const readline = require("readline");
const args = process.argv.splice(2);
const url = args[0];
const path = args[1];

const makeRequest = function(url, path) {
  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }
    writeToFile(body, path);
  });
};

const writeToFile = function(content, path) {
  if (fs.existsSync(path)) {
    if (!overwrite()) return;
  }

  fs.writeFile(path, content, error => {
    if (error) {
      console.log(error);
    }
    console.log(`Downloaded and saved ${content.length} bytes to ${path}`);
  });

};

const overwrite = function() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("File already exists, Enter Y to overwrite, N to cancel\n", answer => {
    if (answer === "N") {
      rl.close();
      console.log(`Download Cancelled`);
      return false;
    }
    if (answer === "Y") {
      rl.close();
      return true;
    }
  });
};



makeRequest(url, path);