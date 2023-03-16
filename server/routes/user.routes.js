// import express from 'express';
// const router = express.Router();
// import { login, register, me, } from '../controllers/user.controller.js';

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', me);

// export default router;



const express = require('express')

//! Controller functions
const { signupUser, loginUser } = require('../controllers/user.controller')

const router = express.Router()

//! Login 
router.post('/login', loginUser)

//! Signup route
router.post('/signup', signupUser)

module.exports = router