const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const corsOptions = require('./controller/cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const verifyJWT = require('./middleware/verifyJWT');
const { securityMiddleware } = require('./middleware/rateLimiter');

const server = express();
require('dotenv').config();


server.use(cors(corsOptions));

// Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());


server.use(securityMiddleware);

// Apply routes
server.get('/', (req, res) => {
    res.send('Hello');
});

server.use('/api/auth', require('./routes/auth/signup'));
server.use('/api/auth/verify-email', require('./routes/auth/verifyEmail'));
server.use('/api/auth/refresh', require('./routes/auth/refresh'));
server.use('/api/product', require('./routes/api/product'));

// Apply JWT verification middleware
server.use(verifyJWT);

server.use('/api/productadmin', require('./routes/api/productAdmin'));
server.use('/api/checkout', require('./routes/api/checkout'));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL, {})
    .then(() => {
        console.log('MongoDB Connected...');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
