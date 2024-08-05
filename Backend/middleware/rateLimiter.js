const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const generalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, 
    legacyHeaders: false, 
});


const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 25, 
    message: 'Too many login attempts from this IP, please try again later.',
    standardHeaders: true, 
    legacyHeaders: false, 
});


const securityMiddleware = [
    helmet(), 
    generalRateLimiter 
];

module.exports = { securityMiddleware, loginRateLimiter };
