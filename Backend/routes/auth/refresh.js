const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../model/User.model');
const router = express.Router();

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, roles: user.role },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1h' }
    );
};

router.post('/', async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401); // No token

    const refreshToken = cookies.refreshToken;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        const foundUser = await User.findOne({ _id: decoded.id }).exec();
        console.log(foundUser)
        if (!foundUser || foundUser.refreshToken !== refreshToken) {
            return res.sendStatus(403); // Forbidden
        }

        const newAccessToken = generateAccessToken(foundUser);
        res.json({
            accessToken: newAccessToken,
            roles: foundUser.role,
            id: foundUser._id,
            name: foundUser.name,
        });
    } catch (err) {
        res.sendStatus(403);
    }
});

module.exports = router;