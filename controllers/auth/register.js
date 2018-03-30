const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('home/register', { layout: 'auth', title: 'Register' })
})

module.exports = router