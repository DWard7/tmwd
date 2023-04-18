const express = require('express')

//! Controller functions
const { signupUser, loginUser } = require('../controllers/user.controller')

const router = express.Router()

//! Login 
router.post('/login', loginUser)

//! Signup route
router.post('/signup', signupUser)

module.exports = router