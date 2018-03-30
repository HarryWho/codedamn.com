const express = require('express')
const router = express.Router()
const home = require('./home')
const auth = require('./auth')

router.use('/', home)
router.use('/', auth)

module.exports = router