const inquirer = require('inquirer')
const mysql = require('mysql2')
require('console.table')
require('dotenv').config()
const db = mysql.createConnection(`mysql://root:${process.env.PASSWORD}@localhost/users_db`)

const viewMenu = () => {
  // db.query('SELECT * FROM menu', (err, menu) => {
  //   if (err) { console.log(err) }
  //   console.table(menu)
  //   mainMenu()
  // })
  db.promise().query('SELECT * FROM users')
    .then(([ rows ]) => {
      console.table(rows)
      mainMenu()
    })
    .catch(err => console.log(err))
}

const addItem = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new menu item?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe the new menu item:'
    },
    {
      type: 'number',
      name: 'price',
      message: 'What is the new menu item price?'
    }
  ])
    .then(item => {
      db.query('INSERT INTO menu SET ?', item, err => {
        if (err) { console.log(err) }
        console.log('New Menu Item Added!')
        mainMenu()
      })
    })
}

const deleteItem = () => {
  db.query('SELECT * FROM menu', (err, menu) => {
    if (err) { console.log(err) }

    inquirer.prompt({
      type: 'list',
      name: 'id',
      message: 'Select the menu item you want to delete:',
      choices: menu.map(item => ({
        name: item.name,
        value: item.id
      }))
    })
      .then(({ id }) => {
        db.query('DELETE FROM menu WHERE ?', { id }, err => {
          if (err) { console.log(err) }
          console.log('Menu Item Deleted!')
          mainMenu()
        })
      })
      .catch(err => console.log(err))
  })
}

const updateItem = () => {
  db.query('SELECT * FROM menu', (err, menu) => {
    if (err) { console.log(err) }

    inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select the menu item you want to update the price:',
        choices: menu.map(item => ({
          name: `${item.name} (${item.price})`,
          value: item.id
        }))
      },
      {
        type: 'number',
        name: 'price',
        message: 'Enter the new value for the item price:'
      }
    ])
      .then(({ id, price }) => {
        db.query('UPDATE menu SET ? WHERE ?', [{ price }, { id }], err => {
          if (err) { console.log(err) }
          console.log('Menu Item Price Updated!')
          mainMenu()
        })
      })
      .catch(err => console.log(err))
  })
}

const mainMenu = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Menu', 'Add Menu Item', 'Update Menu Item Price', 'Delete Menu Item', 'EXIT']
  })
    .then(data => {
      switch (data.action) {
        case 'View Menu':
          viewMenu()
          break
        case 'Add Menu Item':
          addItem()
          break
        case 'Update Menu Item Price':
          updateItem()
          break
        case 'Delete Menu Item':
          deleteItem()
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