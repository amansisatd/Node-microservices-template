const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Test = sequelize.define('Test', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
})

module.exports = Test
