const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('home/login', { layout: 'auth', title: 'Login' })
})

module.exports = router