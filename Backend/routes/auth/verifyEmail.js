const express = require('express')
const Router = express.Router()
const verifyEmail = require('../../controller/verifyEmailController')
const verifySignupSession = require('../../middleware/verifySignupSession')

Router.get('/', verifySignupSession ,(req, res)=>{
    res.status(200).json({ message: "You are authorized to verify your email." , email: req.email });
})
Router.get('/:token',verifySignupSession, verifySignupSession ,(req, res)=>{
    verifyEmail(req, res)
})

module.exports = Router