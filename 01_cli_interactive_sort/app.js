const readline = require('readline');

const rl = readline.createInterface({
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

const handleInput = (input) => {
  const words = input.split(' ');

  const handleChoice = (choice) => {
    const operations = {
      1: sortWordsAtoZ,
      2: sortNumsAscending,
      3: sortNumsDescending,
      4: sortWordsLengthAscending,
      5: getOnlyUniqueWords,
      6: getOnlyUniqueValues,
    };

    const sortedOperation = operations[choice];

    if (sortedOperation) {
      const result = sortedOperation(words);
      console.log('Result:', result.join(' '));
    } else {
      console.log('Invalid choice!');
      rl.close();
      return;
    }

    rl.question(
      'Enter "exit" to exit or press enter to continue: ',
      (answer) => {
        if (answer === 'exit') {
          rl.close();
        } else {
          rl.prompt();
        }
      }
    );
  };

  const prompt = `
What would you like to see in the output? (Enter the corresponding number)
1. Sort words alphabetically
2. Show numbers from lesser to greater
3. Show numbers from bigger to smaller
4. Display words in ascending order by number of letters
5. Show only unique words
6. Display only unique values

Enter your choice: `;

  rl.question(prompt, handleChoice);
};

console.log('Enter words or numbers separated by spaces:');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    handleInput(input);
  }
});

rl.on('close', () => {
  console.log('Exiting the program...');
  process.exit(0);
});

rl.prompt();
