// import the authenticated mongoose client from db connector
const mongoose = require('./dbConnector');

const userSchema = mongoose.Schema({

    fullName: String,
    email: String,
    emailVerified: Boolean,
    passwordHash: String,
    urls: [String],
});

const User = mongoose.model('linkzip-users', userSchema);