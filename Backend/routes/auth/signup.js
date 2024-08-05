const {body} = require('express-validator')
const express = require("express")
const Router = express.Router()
const SignupController = require('../../controller/signupController')
const LoginHandler = require('../../controller/LoginController')
const logoutHandler = require('../../controller/logoutHandler')
const {loginRateLimiter} = require('../../middleware/rateLimiter')

Router.post('/signup', loginRateLimiter ,[
    body('username').notEmpty().withMessage('Username is required.').isLength({min: 3, max:28}).withMessage('Username must range between 3 to 28 letters.'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 7}).withMessage('Password must be at least 7 characters long'),

],async (req, res)=>{
    await SignupController(req, res)
})


Router.post('/logout', loginRateLimiter ,async (req,res)=>{
    await logoutHandler(req, res)
});


Router.post('/login', loginRateLimiter ,[
    body('email').notEmpty().withMessage('Email is required for login'),
    body('password').notEmpty().withMessage(`Password is empty.`)
], async(req, res)=>{
    LoginHandler(req, res)
})

module.exports = Router;