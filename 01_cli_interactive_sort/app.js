const { createReadline } = require('readline');

const rl = createReadline({
  input: process.stdin,
  output: process.stdout,
});

const sortWordsAtoZ = (words) => [...words].sort();

const sortNumsAscending = (numbers) => [...numbers].sort((a, b) => a - b);

const sortNumsDescending = (numbers) => [...numbers].sort((a, b) => b - a);

const sortWordsLengthAscending = (words) =>
  [...words].sort((a, b) => a.length - b.length);

const getOnlyUniqueWords = (words) => [...new Set(words)];

const getOnlyUniqueValues = (values) => [...new Set(values)];

const processInput = (input) => {
  const words = input.split(' ');
};
