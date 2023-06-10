const fs = require('fs');
const inquirer = require('inquirer');

const dbPath = 'users.txt';

function createUser() {
  inquirer
    .createPromptModule([
      {
        type: 'input',
        name: 'name',
        message: 'Please enter a name (Press ENTER to finish):',
        validate: (input) => input.trim() !== '' || 'Name is required',
      },
      {
        type: 'list',
        name: 'gender',
        message: 'Please select a gender:',
        choices: ['Male', 'Female', 'Other'],
        when: (answers) => answers.name.trim() !== '',
      },
      {
        type: 'input',
        name: 'age',
        message: 'Please enter the age:',
        when: (answers) => answers.name.trim() !== '',
      },
    ])
    .then((answers) => {

      if (answers.name.trim() !== '') {
        const user = {
          name: answers.name,
          gender: answers.gender,
          age: answers.age,
        };

        saveUser(user);
        console.log('User information saved successfully!');

        createUser();

      } else {
        findUser();
      }
    });
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(dbPath, JSON.stringify(users));
}

function getUsers() {

  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);

  } catch (error) {
    console.log(`Error reading database: ${error.message}`)
    return [];
  }
}

function findUser() {
  
}