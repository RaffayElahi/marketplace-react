const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, // Allow credentials (cookies) to be sent
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;