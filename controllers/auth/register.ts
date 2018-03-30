import * as express from 'express'
import * as xdebug from 'debug'
import { reCAPTCHAsecret } from '../../secrets'
import User from '../../models/user'
import * as fetch from 'node-fetch'

const router = express.Router()
const debug = xdebug('cd:Register')

router.get('/register', (req, res) => {
    res.render('home/register', { layout: 'auth', title: 'Register' })
})

router.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const cpassword = req.body.cpassword

    const captcha = req.body['g-recaptcha-response']

    const result = await fetch(`https://www.google.com/recaptcha/api/siteverify?response=${captcha}&secret=${reCAPTCHAsecret}`, {
        method: 'GET'
    })


    const json = await result.json()

    if(json.success) {
        User.create({
            name: 'something',
            username,
            email,
            password
        })
        res.json({status: 'done'})
    } else {
        // TODO: Add valid response
        res.json({status:'Problem with registeration'})
    }
})

export default router