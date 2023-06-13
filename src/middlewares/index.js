const cors = require('cors')
const helmet = require('helmet')
const logger = require('./logger')

module.exports = [cors(), helmet(), logger]
