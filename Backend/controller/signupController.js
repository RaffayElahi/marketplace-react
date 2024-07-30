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

    const { email, password, name } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
        return res.status(400).json({ message: "Email already exists. Login to your account." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = await User.create({
            name,
            password: hashedPassword,
            email
        });

        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWT_VERIFY_MAIL_TOKEN, { expiresIn: '1hr' });
        res.cookie('verifyEmailToken', token, {
            httpOnly: true,
            secure: true, 
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        sendEmailVerification(email, token);
        res.status(200).json({ message: "Email has been sent to the mail." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = SignupController;