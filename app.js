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