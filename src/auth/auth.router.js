//Contains authorization and authentication routes

//Login
//Register
//Recovery password
//Verify user

const router = require('express').Router()
const authServices = require('./auth.services')
const { registerUser } = require('../users/users.services')

//The prefix will be /api/v1/auth
router.post('/register', registerUser)

router.post('/login', authServices.login)

module.exports = router