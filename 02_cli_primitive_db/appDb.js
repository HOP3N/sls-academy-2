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
    console.log(`Error reading database: ${error.message}`);
    return [];
  }
}

function findUser() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'search',
        message: 'Would you like to search for a user? (Y/N)',
      },
    ])
    .then((answer) => {
      
      if (answer.search) {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'searchName',
              message: 'Enter the name of the user you want to search for:',
            },
          ])
          .then((searchQuery) => {
            const users = getUsers();
            const foundUser = users.find(
              (user) =>
                user.name.toLowerCase() === searchQuery.searchName.toLowerCase()
            );

            if (foundUser) {
              console.log('User found:');
              console.log(foundUser);
            } else {
              console.log('User not found!');
            }
          });
      } else {
        console.log('Thank you and goodbye!');
      }
    });
}

console.log('Welcome!');
createUser();
