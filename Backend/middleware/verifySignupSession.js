const jwt = require('jsonwebtoken');

const verifySignupSession = (req, res, next) => {
    const token = req.cookies.verifyEmailToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please sign up first." });
    }

    jwt.verify(token, process.env.JWT_VERIFY_MAIL_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized. Token is invalid or expired." });
        }
        req.userId = decoded._id;
        req.email = decoded.email; 
        next();
    });
};

module.exports = verifySignupSession;