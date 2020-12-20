const mysql = require("mysql2");
const figlet = require("figlet");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { resolve } = require("path");
const { truncate } = require("fs");

let departmentsArr = [];
let managersArr = [];
let rolesArr = [];

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
  queryArrays();

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
    case "View all employees":
      getEmployees();
      break;
    case "View all departments":
      getDepartments();
      break;
    case "View all roles":
      getRoles();
      break;
    case "Add a department":
      addDepartment(data);
      break;
    case "Add a role":
      addRole(data);
      break;
    case "Add an employee":
      addEmployee(data);
      break;
    case "Update an empoyee role":
      break;
    case "Quit":
      cont = false;
      break;
  }
  if (!cont) {
    console.log("Bye Bye!");
    process.exit(0);
  }
};

const queryArrays = () => {
  connection.query(`SELECT * FROM managers`, (err, rows) => {
    if (err) throw err;
    rows.map((el) => {
      managersArr.push(`${el.first_name} ${el.last_name}`);
    });
  });
  connection.query(`SELECT * FROM job_roles`, (err, rows) => {
    if (err) throw err;
    rows.map((el) => {
      rolesArr.push(el.role);
    });
  });
  connection.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) throw err;
    rows.map((el) => {
      departmentsArr.push(el.name);
    });
  });
};

const addEmployee = (data) => {
  let roleId = rolesArr.indexOf(data.role) + 1;
  let managerId = managersArr.indexOf(data.manager) + 1;

  connection.query(
    `INSERT INTO employees (first_name, last_name, title_id, manager_id) VALUES (?,?,?,?)`,
    [data.firstName, data.lastName, roleId, managerId],
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

const addDepartment = (data) => {
  connection.query(
    `INSERT INTO departments (name) VALUES (?)`,
    [data.name],
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

const addRole = (data) => {
  let departmentId = departmentsArr.indexOf(data.department) + 1;
  connection.query(
    `INSERT INTO job_roles (role, department_id, salary) VALUES (?, ?, ?)`,
    [data.name, departmentId, parseInt(data.salary)],
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

const getRoles = () => {
  connection.query(
    `SELECT job_roles.id, job_roles.role, job_roles.salary, departments.name
     FROM job_roles
     LEFT JOIN departments
     ON job_roles.department_id = departments.id`,
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

const getDepartments = () => {
  connection.query("SELECT * FROM departments", (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const getEmployees = () => {
  connection.query(
    `SELECT employees.id, employees.first_name, employees.last_name, 
    job_roles.role, job_roles.salary,
    managers.first_name AS manager_first, managers.last_name AS manager_last 
    FROM employees
    LEFT JOIN job_roles
    ON employees.title_id = job_roles.id
    LEFT JOIN managers
    ON employees.manager_id = managers.id`,
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
    }
  );
};

const prompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "functions",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
      {
        type: "input",
        name: "name",
        message: "Please input the name of the new role",
        when: function (data) {
          console.log(data);
          if (data.functions == "Add a role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        name: "department",
        message: "Please choose a department.",
        choices: departmentsArr,
        when: function (data) {
          if (data.functions == "Add a role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Please input Salary for job role",
        when: function (data) {
          if (data.functions == "Add a role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "name",
        message: "Please input department name",
        when: function (data) {
          if (data.functions == "Add a department") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "firstName",
        message: "Enter employee's first name",
        when: function (data) {
          if (data.functions == "Add an employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee's last name",
        when: function (data) {
          if (data.functions == "Add an employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "Choose employee's job Role",
        choices: rolesArr,
        when: function (data) {
          if (data.functions == "Add an employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Choose employee's manager",
        choices: managersArr,
        when: function (data) {
          if (data.functions == "Add an employee") {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((answers) => chooser(answers))
    .catch((err) => console.log(err));
};

new Promise(afterConnection).then(prompt).catch((error) => {
  console.log(error);
});
