const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const rfs = require('rotating-file-stream')

const logDirectory = path.join(__dirname, '..', '..', '..', '.logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
  compress: 'gzip',
  maxFiles: 30,
})

const loggerMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return morgan('combined', { stream: accessLogStream })(req, res, next)
  }
  return morgan('dev')(req, res, next)
}

module.exports = loggerMiddleware
