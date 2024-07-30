const {body} = require('express-validator')
const express = require("express")
const Router = express.Router()
const SignupController = require('../../controller/signupController')
const LoginHandler = require('../../controller/LoginController')

Router.post('/signup',[
    body('name').notEmpty().withMessage('Name is required.').isLength({min: 3}).withMessage('Name must range between 3 to 20 letters.'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 7}).withMessage('Password must be at least 7 characters long'),

],async (req, res)=>{
    await SignupController(req, res)
})

const logoutHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // No content
    }

    // Delete refresh token in the database
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204); // No content
};

Router.post('/logout', logoutHandler);


Router.post('/login', [
    body('email').notEmpty().withMessage('Email is required for login'),
    body('password').notEmpty().withMessage(`Password is empty.`)
], async(req, res)=>{
    LoginHandler(req, res)
})

module.exports = Router;