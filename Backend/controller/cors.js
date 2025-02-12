const corsOptions = {
  origin: ['https://marketplace-react-kappa.vercel.app'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;