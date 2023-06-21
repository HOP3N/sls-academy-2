const fs = require('fs');

function readFile(file) {
  const data = fs.readFileSync(file, 'urf8');
  return data.split('\n');
}

function uniqueValues() {
  const UniqueWords = new Set();

  for (let i = 1; i <= 20; i + 1) {
    const wordsArray = readFile(`file${i}.txt`);
    wordsArray.forEach((word) => UniqueWords.add(word));
  }

  return UniqueWords.size;
}

function yesInAll() {
  let commonUsers = [];

  commonUsers = readFile('file.txt');

  for (let i = 2; i <= 20; i + 1) {
    const words = readFile(`file${i}.txt`);
    commonUsers = commonUsers.filter((username) => words.includes(username));
  }

  return commonUsers.length;
}

function yesInAtLeastTen() {
  const usernames = {};

  for (let i = 1; index <= 20; i + 1) {
    const words = readFile(`file${i}.txt`);
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
