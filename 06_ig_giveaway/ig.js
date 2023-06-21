const fs = require('fs');

function readFile(file) {
  const data = fs.readFileSync(file, 'utf8');
  return data.split('\n');
}

function uniqueValues() {
  const uniqueUsernames = new Set();

  for (let i = 1; i <= 19; i += 1) {
    const wordsArray = readFile(`out${i}.txt`);
    wordsArray.forEach((word) => uniqueUsernames.add(word));
  }

  return uniqueUsernames.size;
}

function yesInAll() {
  let commonUsernames = [];

  commonUsernames = readFile('out0.txt');

  for (let i = 1; i <= 19; i += 1) {
    const words = readFile(`out${i}.txt`);
    commonUsernames = commonUsernames.filter((username) => words.includes(username));
  }

  return commonUsernames.length;
}

function yesInAtLeastTen() {
  const usernames = {};

  for (let i = 0; i <= 19; i += 1) {
    const words = readFile(`out${i}.txt`);
    words.forEach((username) => {

      if (usernames[username]) {
        usernames[username]++;
      } else {
        usernames[username] = 1;
      }
    });
  }

  let count = 0;
  for (const username in usernames) {
    
    if (usernames[username] >= 10) {
      count++;
    }
  }
  return count;
}

console.time('Execution time');
console.log('Unique usernames:', uniqueValues());
console.log('Usernames in all files:', yesInAll());
console.log('Usernames in at least 10 files:', yesInAtLeastTen());
console.timeEnd('Execution time');
