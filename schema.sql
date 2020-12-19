DROP DATABASE IF EXISTS business;
DROP TABLE IF EXISTS job_roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS managers;
DROP TABLE IF EXISTS employees;

CREATE DATABASE business;

USE business;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE job_roles (
  id INT NOT NULL AUTO_INCREMENT,
  role varchar(30) NOT NULL,
  department_id INT,
  salary INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE managers (
  id INT NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  title_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_title FOREIGN KEY (title_id) REFERENCES job_roles(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES managers(id) ON DELETE SET NULL
);