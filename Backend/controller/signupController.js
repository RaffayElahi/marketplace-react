const { body, validationResult } = require('express-validator');
const User = require('../model/User.model');
const sendEmailVerification = require('./mailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SignupController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;
    
    try {
        // Check for existing email
        const existingEmail = await User.findOne({ email }).exec();
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists. Login to your account." });
        }
        
        // Check for existing username
        const existingUsername = await User.findOne({ username }).exec();
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists. Use a different username." });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email
        });

        // Create verification token
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWT_VERIFY_MAIL_TOKEN, { expiresIn: '1hr' });
        
        // Set cookie and send verification email
        res.cookie('verifyEmailToken', token, {
            httpOnly: true,
            secure: true, 
            maxAge: 60 * 60 * 1000 
        });
        sendEmailVerification(email, token);
        
        res.status(200).json({ message: "Email has been sent to the mail." });
    } catch (err) {
        console.error('Error occurred during user signup:', err);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = SignupController;
