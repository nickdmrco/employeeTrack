USE employees_db;

INSERT INTO department (name)
VALUES ('Marketing'),
('Sales')

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 10000, 2),
('Marketing lead', 12312, 1)

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 2),
('Jenny', 'doe', 1, NULL)

