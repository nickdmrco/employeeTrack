USE employees_db;

INSERT INTO departments
    (name)
VALUES
    ('Engineering'),
    ('Legal'),
    ('Sales');
    ('Financial'),

INSERT INTO roles
    (title, salary, departmentId)
VALUES
    ('Legal Lead', 150000, 4),
    ('Salesperson', 75000, 1),
    ('Software Engineer', 110000, 2),
    ('Sales Lead', 90000, 1),
    ('Lawyer', 175000, 4);
    ('Accountant', 110000, 3),
    ('Lead Engineer', 120000, 2),
    ('Account Manager', 110000, 3),

INSERT INTO employees
    (firstName, lastName, roleId, managerId)
VALUES
    ('Madison', 'Bowes', 6, 5),
    ('Courtnie', 'Bean', 3, NULL),
    ('Willem', 'Larson', 2, 1),
    ('Ava', 'Dolan', 8, 7);
    ('Elliot', 'Thatcher', 7, NULL),
    ('Garry', 'Amos', 1, NULL),
    ('Fabien', 'Pate', 4, 3),
    ('Kiki', 'Armstrong', 5, NULL),