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
  let cont = true;
  switch (data.functions) {
  case 'View all employees':
    getEmployees()
    break;
  case 'View all departments':
    getDepartments();
    break;
  case 'View all roles':
    getRoles();
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
  case 'Quit':
  cont = false;
  break;
}
if (!cont) {
  console.log('Bye Bye!')
  process.exit(0)
}
}

const addDepartment = () => {
  connection.query('INSERT INTO job_roles (name) VALUES ?', (err, rows) => {
    if (err) throw err;
    console.table(rows)
  })
}

const getRoles = () => {
  connection.query(
    `SELECT job_roles.id, job_roles.role, job_roles.salary, departments.name
     FROM job_roles
     LEFT JOIN departments
     ON job_roles.department_id = departments.id`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  })
}

const getDepartments = () => {
  connection.query("SELECT * FROM departments", (err, rows) => {
    if (err) throw err;
    console.table(rows);
  })
}

const getEmployees = () => {
  connection.query(
    `SELECT employees.id, employees.first_name, employees.last_name, 
    job_roles.role, job_roles.salary,
    managers.first_name AS manager_first, managers.last_name AS manager_last 
    FROM employees
    LEFT JOIN job_roles
    ON employees.title_id = job_roles.id
    LEFT JOIN managers
    ON employees.manager_id = managers.id`
    , (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

new Promise(afterConnection).then(prompt).then(chooser);

 