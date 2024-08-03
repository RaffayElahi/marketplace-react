const { validationResult } = require('express-validator');
const User = require('../model/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_REFRESH_TOKEN } = process.env;

const LoginHandler = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }


        const roles = foundUser.role;
        const id = foundUser._id;
        const username = foundUser.username

        const refreshToken = jwt.sign(
            { 
                id: foundUser._id,
                email: foundUser.email 
            },
            JWT_REFRESH_TOKEN, 
            { expiresIn: '1d' } 
        );

        foundUser.refreshToken = refreshToken;
        
        await foundUser.save();

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'Lax', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({ roles, id, username, refreshToken });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
};

module.exports = LoginHandler;