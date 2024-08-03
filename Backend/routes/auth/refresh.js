const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../model/User.model');
const router = express.Router();

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, roles: user.role },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1m' }
    );
};

router.post('/', async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401); 

    const refreshToken = cookies.refreshToken;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        const foundUser = await User.findOne({ _id: decoded.id }).exec();
        if (!foundUser || foundUser.refreshToken !== refreshToken) {
            return res.sendStatus(403); 
        }

        const newAccessToken = generateAccessToken(foundUser);
        res.json({
            accessToken: newAccessToken,
            roles: foundUser.role,
            id: foundUser._id,
            username: foundUser.username,
        });
    } catch (err) {
        res.sendStatus(403);
    }
});

module.exports = router;