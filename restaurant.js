const inquirer = require('inquirer')
const mysql = require('mysql2')
require('console.table')
require('dotenv').config()
const db = mysql.createConnection(`mysql://root:${process.env.PASSWORD}@localhost/employees_db`)

const viewEmployees = () => {
  // db.query('SELECT * FROM menu', (err, menu) => {
  //   if (err) { console.log(err) }
  //   console.table(menu)
  //   mainMenu()
  // })
  db.promise().query('SELECT * FROM employee')
    .then(([rows]) => {
      console.table(rows)
      mainMenu()
    })
    .catch(err => console.log(err))
}

const addDepartment = () => {
  db.promise().query('SELECT * FROM department')
    .then(([ rows ]) => {
      const departmentArray = rows.map(row => ({ name: row.name, value: row.id }))
      
    })
}


const addEmployee = () => {
  db.promise().query('SELECT * FROM role')
    .then(([rows]) => {
      const roleArray = rows.map(row => ({ name: row.title, value: row.id }))
      db.promise().query('SELECT * FROM employee')
        .then(([rows]) => {
          const managerArray = rows.map(row => ({ name: row.first_name + " " + row.last_name, value: row.id }))
          inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'What is the employees first name?'
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'What is the employees last name?'
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'What is the empolyees role?',
              choices: roleArray
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Who is this employees manager?',
              choices: [...managerArray, { name: 'none', value: null }]
            }


          ]).then(res => {
            db.promise().query('INSERT INTO employee SET ?', res)
              .then(data => {
                console.log('added new employee!')
                mainMenu()
              })
          })

        })
    })
}



// const addItem = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'What is the name of the new menu item?'
//     },
//     {
//       type: 'input',
//       name: 'description',
//       message: 'Describe the new menu item:'
//     },
//     {
//       type: 'number',
//       name: 'price',
//       message: 'What is the new menu item price?'
//     }
//   ])
//     .then(item => {
//       db.query('INSERT INTO menu SET ?', item, err => {
//         if (err) { console.log(err) }
//         console.log('New Menu Item Added!')
//         mainMenu()
//       })
//     })
// }

// const deleteItem = () => {
//   db.query('SELECT * FROM menu', (err, menu) => {
//     if (err) { console.log(err) }

//     inquirer.prompt({
//       type: 'list',
//       name: 'id',
//       message: 'Select the menu item you want to delete:',
//       choices: menu.map(item => ({
//         name: item.name,
//         value: item.id
//       }))
//     })
//       .then(({ id }) => {
//         db.query('DELETE FROM menu WHERE ?', { id }, err => {
//           if (err) { console.log(err) }
//           console.log('Menu Item Deleted!')
//           mainMenu()
//         })
//       })
//       .catch(err => console.log(err))
//   })
// }

// const updateItem = () => {
//   db.query('SELECT * FROM menu', (err, menu) => {
//     if (err) { console.log(err) }

//     inquirer.prompt([
//       {
//         type: 'list',
//         name: 'id',
//         message: 'Select the menu item you want to update the price:',
//         choices: menu.map(item => ({
//           name: `${item.name} (${item.price})`,
//           value: item.id
//         }))
//       },
//       {
//         type: 'number',
//         name: 'price',
//         message: 'Enter the new value for the item price:'
//       }
//     ])
//       .then(({ id, price }) => {
//         db.query('UPDATE menu SET ? WHERE ?', [{ price }, { id }], err => {
//           if (err) { console.log(err) }
//           console.log('Menu Item Price Updated!')
//           mainMenu()
//         })
//       })
//       .catch(err => console.log(err))
//   })
// }

const mainMenu = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Employees', 'Add Department', 'Add Roles', 'Add Employees', 'View Departments', 'View Employees', 'View Roles', 'EXIT']
  })
    .then(data => {
      switch (data.action) {
        case 'View Employees':
          viewEmployees()
          break
        case 'Add Department':
          addDepartment()
          break
        case 'Add Employees':
          addEmployee()
          break
        case 'Add Roles':
          AddRole()
          break
        case 'View Departments':
          viewDepartment()
          break
        case 'View Employees':
          viewEmployee()
          break
        case 'View Roles':
          viewRole()
          break
        case 'EXIT':
          process.exit()
          break
        default:
          console.log("Something bad")
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()