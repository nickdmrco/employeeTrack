const inquirer = require('inquirer')
const mysql = require('mysql2')
require('console.table')
require('dotenv').config()
const db = mysql.createConnection(`mysql://root:${process.env.PASSWORD}@localhost/employees_db`)

const deleteEmployee = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.log(err)
      mainMenu()
    } else {
      console.table(employees.sort((a, b) => { return a.id - b.id }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select an employee you want to delete:',
          choices: employees.map(employee => {
            return employee.id
          })
            .concat(['Return to Delete Menu', 'Return to Main Menu'])
            .sort((a, b) => { return a - b })

        }
      ])
        .then(({ choice }) => {
          switch (choice) {
            case 'Return to Delete Menu':
              deleteMenu()
              break
            case 'Return to Main Menu':
              mainMenu()
              break
            default:
              db.query(`DELETE FROM employees WHERE id = ${choice}`, err => {
                if (err) {
                  console.log(err)
                  deleteEmployee()
                } else {
                  console.log('Employee Deleted!')
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'option',
                      message: 'What would you like to do now',
                      choices: ['Delete Another Employee', 'Return to Delete Menu', 'Return to Main Menu']
                    }
                  ])
                    .then(({ option }) => {
                      switch (option) {
                        case 'Delete Another Employee':
                          deleteEmployee()
                          break
                        case 'Return to Delete Menu':
                          deleteMenu()
                          break
                        case 'Return to Main Menu':
                          mainMenu()
                          break
                      }
                    })
                }
              })
              break
          }
        })
        .catch(err => console.log(err))
    }
  })
}

const deleteRole = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) {
      console.log(err)
      mainMenu()
    } else {
      console.table(roles.sort((a, b) => { return a.id - b.id }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select a role you want to delete:',
          choices: roles.map(role => {
            return role.id
          })
            .concat(['Return to Delete Menu', 'Return to Main Menu'])
            .sort((a, b) => { return a - b })
        }
      ])
        .then(({ choice }) => {
          switch (choice) {
            case 'Return to Delete Menu':
              deleteMenu()
              break
            case 'Return to Main Menu':
              mainMenu()
              break
            default:
              db.query(`DELETE FROM roles WHERE id = ${choice}`, err => {
                if (err) {
                  console.log(err)
                  deleteRole()
                } else {
                  console.log('Role Deleted!')
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'option',
                      message: 'What would you like to do now',
                      choices: ['Delete Another Role', 'Return to Delete Menu', 'Return to Main Menu']
                    }
                  ])
                    .then(({ option }) => {
                      switch (option) {
                        case 'Delete Another Role':
                          deleteRole()
                          break
                        case 'Return to Delete Menu':
                          deleteMenu()
                          break
                        case 'Return to Main Menu':
                          mainMenu()
                          break
                      }
                    })
                }
              })
              break
          }
        })
        .catch(err => console.log(err))
    }
  })

  const deleteDepartment = () => {
    db.query('SELECT * FROM departments', (err, departments) => {
      if (err) {
        console.log(err)
        mainMenu()
      } else {
        console.table(departments.sort((a, b) => { return a.id - b.id }))
        inquirer.prompt([
          {
            type: 'list',
            name: 'choice',
            message: 'Select a department you want to delete:',
            choices: departments.map(department => {
              return department.id
            })
              .concat(['Return to Delete Menu', 'Return to Main Menu'])
              .sort((a, b) => { return a - b })
          }
        ])
          .then(({ choice }) => {
            switch (choice) {
              case 'Return to Delete Menu':
                deleteMenu()
                break
              case 'Return to Main Menu':
                mainMenu()
                break
              default:
                db.query(`DELETE FROM departments WHERE id = ${choice}`, err => {
                  if (err) {
                    console.log(err)
                    deleteDepartment()
                  } else {
                    console.log('Department Deleted!')
                    inquirer.prompt([
                      {
                        type: 'list',
                        name: 'option',
                        message: 'What would you like to do now',
                        choices: ['Delete Another Department', 'Return to Delete Menu', 'Return to Main Menu']
                      }
                    ])
                      .then(({ option }) => {
                        switch (option) {
                          case 'Delete Another Department':
                            deleteDepartment()
                            break
                          case 'Return to Delete Menu':
                            deleteMenu()
                            break
                          case 'Return to Main Menu':
                            mainMenu()
                            break
                        }
                      })
                  }
                })
                break
            }
          })
          .catch(err => console.log(err))
      }
    })
  }
  const deleteMenu = () => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Which of the following would you like to delete:',
        choices: ['Departments', 'Roles', 'Employees', 'Return to Main Menu']
      }
    ])
      .then(({ option }) => {
        switch (option) {
          case 'Departments':
            deleteDepartment()
            break
          case 'Roles':
            deleteRole()
            break
          case 'Employees':
            deleteEmployee()
            break
          case 'Return to Main Menu':
            mainMenu()
            break
        }
      })
  }

  const matchEmployee = (employees, id) => {
    let len = employees.length
    for (let i = 0; i < len; i++) {
      if (employees[i].id === id) {
        return `${employees[i].firstName} ${employees[i].lastName}`
      }
    }
    return 'Nobody'
  }

  const matchRole = (roles, id) => {
    let len = roles.length
    for (let i = 0; i < len; i++) {
      if (roles[i].id === id) {
        return roles[i].title
      }
    }
    return 'Nothing'
  }

  const updateEmployee = (id) => {
    db.query(`SELECT * FROM employees WHERE id = ${id}`, (err, employee) => {
      if (err) {
        console.log(err)
        mainMenu()
      } else {
        console.table(employee.sort((a, b) => { return a.id - b.id }))
        inquirer.prompt([
          {
            type: 'list',
            name: 'option',
            message: 'Which data type do you want to change:',
            choices: ['firstName', 'lastName', 'roleId', 'managerId', 'Return to Update Menu', 'Return to Main Menu']
          }
        ])
          .then(({ option }) => {
            employee = employee[0]
            switch (option) {
              case 'firstName':
                inquirer.prompt([
                  {
                    type: 'input',
                    name: 'firstName',
                    message: `Their current First name is '${employee.firstName}'. What should their new First Name be:`
                  }
                ])
                  .then(({ firstName }) => {
                    employee.firstName = firstName
                    db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                      if (err) {
                        console.log(err)
                        updateMenu()
                      } else {
                        updateEmployee(id)
                      }
                    })
                  })
                break
              case 'lastName':
                inquirer.prompt([
                  {
                    type: 'input',
                    name: 'lastName',
                    message: `Their current Last Name is '${employee.lastName}'. What should their new Last Name be:`
                  }
                ])
                  .then(({ lastName }) => {
                    employee.lastName = lastName
                    db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                      if (err) {
                        console.log(err)
                        updateMenu()
                      } else {
                        updateEmployee(id)
                      }
                    })
                  })
                break
              case 'roleId':
                db.query('SELECT * FROM roles', (err, roles) => {
                  if (err) {
                    console.log(err)
                    mainMenu()
                  } else {
                    console.table(roles)
                    inquirer.prompt([
                      {
                        type: 'input',
                        name: 'role',
                        message: `Their current role is ${matchRole(roles, employee.roleId)}. What should their new role be:`,
                        validate: function (res) {
                          let roleId = parseInt(res)
                          return (!isNaN(roleId) && matchRole(roles, roleId) !== 'Nothing')
                        }
                      }
                    ])
                      .then(({ role }) => {
                        employee.roleId = role
                        db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                          if (err) {
                            console.log(err)
                            updateMenu()
                          } else {
                            updateEmployee(id)
                          }
                        })
                      })
                  }
                })
                break
              case 'managerId':
                db.query('SELECT * FROM employees', (err, employees) => {
                  if (err) {
                    console.log(err)
                    mainMenu()
                  } else {
                    console.table(employees)
                    inquirer.prompt([
                      {
                        type: 'input',
                        name: 'manager',
                        message: `Their current manager is ${matchEmployee(employees, employee.managerId)}. What is the id of their new manager (leave blank for no manager):`,
                        validate: function (res) {
                          let managerId = parseInt(res)
                          return (!isNaN(managerId) && matchEmployee(employees, managerId) !== 'Nobody') || (res === '')
                        }
                      }
                    ])
                      .then(({ manager }) => {
                        if (manager === '') {
                          manager = null
                        }
                        employee.managerId = manager
                        db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                          if (err) {
                            console.log(err)
                            updateMenu()
                          } else {
                            updateEmployee(id)
                          }
                        })
                      })
                  }
                })
                break
              case 'Return to Update Menu':
                updateMenu()
                break
              case 'Return to Main Menu':
                mainMenu()
                break

            }
          })
          .catch(err => console.log(err))
      }
    })
  }