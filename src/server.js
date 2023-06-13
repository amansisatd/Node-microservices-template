const express = require('express')
const path = require('path')
const app = express()

// env variable
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.var', '.env'),
})

// db connection
const sequelize = require('./configs/db')
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}
connectDB()

// static files
app.use(
  express.static(path.join(__dirname, '..', '..', '.public', 'serviceName'))
)

// middlewares
const middlewares = require('./middlewares')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middlewares)

// routes
//-- the routes are defined here
app.use('/api/status', require('./routes/status'))

// db relations
require('./configs/relations')

// sync db
sequelize.sync({
  force: false,
  alter: process.env.NODE_ENV === 'production' ? false : true,
})

// error handler
const errorHandler = require('./middlewares/error')
app.use(errorHandler)

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
