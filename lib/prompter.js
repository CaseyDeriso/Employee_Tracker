const inquirer = require("inquirer");

prompt = (res, rej) => {

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'functions',
        message: "What would you like to do?",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
      },
    ]);
};

module.exports = prompt;