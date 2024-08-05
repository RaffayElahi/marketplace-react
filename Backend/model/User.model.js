const {Schema, model} = require('mongoose')
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        match: /^[A-Za-z0-9]+$/,
        maxlength: 28
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken:{
        type: String,
        default: null
    }
})

const User = model('User', UserSchema);
module.exports = User
