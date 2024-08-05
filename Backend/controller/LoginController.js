const { validationResult } = require('express-validator');
const User = require('../model/User.model');
const FailedLoginAttempt = require('../model/FailedLoginAttempt.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_REFRESH_TOKEN } = process.env;

const COOLDOWN_PERIOD = 10 * 60 * 1000; 
const MAX_ATTEMPTS = 3;

const LoginHandler = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const now = Date.now();
        const failedAttempt = await FailedLoginAttempt.findOne({ email }).exec();

        if (failedAttempt) {
            const { attempts, lastAttempt } = failedAttempt;
            const lastAttemptTime = new Date(lastAttempt).getTime();
            const remainingTime = COOLDOWN_PERIOD - (now - lastAttemptTime);

            if (attempts >= MAX_ATTEMPTS && remainingTime > 0) {
                return res.status(429).json({ 
                    message: `Too many failed attempts. Please try again in ${Math.ceil(remainingTime / 1000)} seconds.`,
                });
            }

            if (now - lastAttemptTime >= COOLDOWN_PERIOD) {
                await FailedLoginAttempt.updateOne(
                    { email },
                    { $set: { attempts: 0, lastAttempt: now } }
                );
            }
        }

        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) {
            await incrementFailedAttempts(email);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            await incrementFailedAttempts(email);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        await FailedLoginAttempt.deleteOne({ email });

        const roles = foundUser.role;
        const id = foundUser._id;
        const username = foundUser.username;

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

async function incrementFailedAttempts(email) {
    const now = Date.now();
    const failedAttempt = await FailedLoginAttempt.findOne({ email }).exec();

    if (failedAttempt) {
        await FailedLoginAttempt.updateOne(
            { email },
            { $inc: { attempts: 1 }, $set: { lastAttempt: now } }
        );
    } else {
        await FailedLoginAttempt.create({ email, attempts: 1, lastAttempt: now });
    }
}

module.exports = LoginHandler;
