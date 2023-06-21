const fs = require('fs');

function readFile(file) {
  const data = fs.readFileSync(file, 'utf8');
  return data.split('\n');
}

function uniqueValues() {
  const uniqueWordsSet = new Set();

  for (let i = 0; i < 20; i++) {
    const wordsArray = readFile(`txt/out${i}.txt`);
    wordsArray.forEach((word) => uniqueWordsSet.add(word));
  }

  return uniqueWordsSet.size;
}

function yesInAll() {
  let commonUsers = readFile('txt/out0.txt');

  for (let i = 1; i < 20; i++) {
    const words = readFile(`txt/out${i}.txt`);
    commonUsers = commonUsers.filter((username) => words.includes(username));
  }

  return commonUsers.length;
}

function yesInAtLeastTen() {
  const usernames = {};

  for (let i = 0; i < 20; i++) {
    const words = readFile(`txt/out${i}.txt`);
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
