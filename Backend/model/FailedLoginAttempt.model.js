const mongoose = require('mongoose');

const FailedLoginAttemptSchema = new mongoose.Schema({
    email: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    lastAttempt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FailedLoginAttempt', FailedLoginAttemptSchema);