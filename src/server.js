const express = require('express')
const path = require('path')
const app = express()

// env variable
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.var', '.env'),
})

// db
require('./configs/db')

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

// error handler
const errorHandler = require('./middlewares/error')
app.use(errorHandler)

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
