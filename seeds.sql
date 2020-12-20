INSERT INTO managers (first_name, last_name)
VALUES ("Omar", "Esqueda"), ("Matt", "Hubbard"), 
("Lauren", "DuVall"), ("Riley", "Walker"), 
("Bill", "Brewer"), ("Craig", "Stickler"), 
("Jaime", "Navarro");

INSERT INTO departments (name) 
VALUES ("Shop"), ("Service Drive"), ("Parts"), ("sales");

INSERT INTO job_roles (role, department_id, salary) 
VALUES ("Used Car Sales", 4, 100000), ("New Car Sales", 4, 100000), 
("Service Advisor", 2, 100000), ("Parts Counter", 3, 100000), 
("Parts Warehouse", 3, 1000000), ("Technician", 1, 100000), 
("Technician's Apprentice", 1, 1000000);

INSERT INTO employees (first_name, last_name, title_id, manager_id)
VALUES ("Casey", "Deriso", 6, 1), ("Steve", "Berczik", 3, 3), 
("Brian", "Ebnet", 3, 7), ("Gerovanny", "Ventura", 1, 6),
("John", "Bowyer", 2, 5), ("Davey", "Jones", 3, 3);