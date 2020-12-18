INSERT INTO job_roles (name) 
VALUES ("Used Car Sales"), ("New Car Sales"), ("Service Advisor"), ("Parts Counter"), ("Parts Warehouse"), ("Technician"), ("Technician's Apprentice");

INSERT INTO departments (name) 
VALUES ("Shop"), ("Service Drive"), ("Parts"), ("New Car"), ("Used Car");

INSERT INTO managers (first_name, last_name)
VALUES ("Omar", "Esqueda"), ("Matt", "Hubbard"), ("Lauren", "DuVall"), ("Riley", "Walker"), ("Bill", "Brewer"), ("Craig", "Stickler");

INSERT INTO employees (first_name, last_name, title_id, department_id, salary, manager_id)
VALUES ("Casey", "Deriso", 6, 1, 1000000, 1)