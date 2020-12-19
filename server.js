const mysql = require("mysql2");
const figlet = require("figlet");
const cTable = require("console.table");
const prompt = require("./lib/prompter.js");

// create connection to databse
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // your MySQL username
  user: "root",
  // your MySQL password
  password: "g@tewayGT5656",
  database: "business",
});

// connect
connection.connect((err) => {
  if (err) throw err;
});


afterConnection = (res, rej) => {
  figlet("AUDI SOUTH AUSTIN", function (err, data) {
    if (err) {
      rej("something went wrong...");
    }
    console.log(data);
    res("sucess!");
  });
};

const chooser = (data) => {
  switch (data.functions) {
  case 'View all employees':
    getEmployees()
    break;
  case 'View all departments':
    getDepartments();
    break;
  case 'Add a department':
    addDepartment();
    break;
  case 'Add a role':
    addRole();
    break;
  case 'Add an emplyee':
    addEmployee();
    break;
  case 'Update an empoyee role':
    break;
}
}

const addDepartment = () => {
  connection.query('INSERT INTO job_roles (name) VALUES ?', (err, rows) => {
    if (err) throw err;
    console.table(rows)
  })
}

const getDepartments = () => {
  connection.query("SELECT * FROM job_roles", (err, rows) => {
    if (err) throw err;
    console.table(rows);
  })
}

const getEmployees = () => {
  connection.query("SELECT * FROM employees", (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const init = new Promise(afterConnection).then(prompt).then(chooser);

