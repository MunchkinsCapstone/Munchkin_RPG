const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  status: {
    type: Sequelize.ENUM('IN BATTLE', 'OPEN')
  }
})

module.exports = Room
