const jwt = require("jsonwebtoken")

const jwtAuthenticate = (req, res, next ) =>{
    const token = req.header('Authorization').replace('Brearer: ', "")
    if (!token){
        res.status(400).json({"message": "Access Denied"})
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_VERIFY_MAIL_TOKEN )
        req.user = verified
        next()
    }catch(Err){
        res.status(400).json({"message": "Invalid Token"})
    }
}

module.exports = jwtAuthenticate