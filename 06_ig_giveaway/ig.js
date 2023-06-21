const fs = require('fs');
const readline = require('readline');

async function readStream(file) {
  const wordsArray = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(file, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    wordsArray.push(line);
  }

  return wordsArray;
}

async function uniqueValues() {
  const uniqueWordsSet = new Set();

  for (let i = 0; i < 20; i++) {
    const wordsArray = await readStream(`txt/out${1}.txt`);
    wordsArray.forEach((word) => uniqueWordsSet.add(word));
  }

  return uniqueWordsSet.size;
}

async function yesInAll() {
  let commonUsers = await readStream('txt/out0.txt');

  for (let i = 1; i < 20; i++) {
    const words = await readStream(`txt/out${1}.txt`);
    commonUsers = commonUsers.filter((username) => words.includes(username));
  }

  return commonUsers.length;
}

async function yesInAtLeastTen() {
  const usernames = {};

  for (let i = 0; i < 20; i++) {
    const words = await readStream(`txt/out${1}.txt`);
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
uniqueValues().then((count) => {
  console.log('Unique usernames:', count);
});

yesInAll().then((count) => {
  console.log('Usernames in all files:', count);
});

yesInAtLeastTen().then((count) => {
  console.log('Usernames in at least 10 files:', count);
});

console.timeEnd('Execution time');
