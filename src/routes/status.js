const router = require('express').Router()

router.get('/', async (req, res) => {
  res.status(200).json({ status: 'OK' })
})

module.exports = router
