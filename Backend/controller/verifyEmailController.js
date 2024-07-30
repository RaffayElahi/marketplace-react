const jwt = require('jsonwebtoken')
const User = require('../model/User.model')


const verifyEmail = (req, res) =>{
    const  token  = req.params.token;
    jwt.verify(token, process.env.JWT_VERIFY_MAIL_TOKEN, async (err, id)=>{
        if(err){
            return res.status(400).json({"message": "Token expired or invalid"})
        }
        const user = await User.findByIdAndUpdate(id, {isVerified: true}, {new: true}).exec();
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        res.cookie('verifyEmailToken', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        });
        res.status(200).json({message: "Email verified successfully", email: req.email})

    })
}

module.exports = verifyEmail;