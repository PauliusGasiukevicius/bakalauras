let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
        ID: String,
        passwordHash: String,
        name : String,
        email : String,
        imageUrl: String,
        courses: [mongoose.ObjectId],
        badges: [mongoose.ObjectId]
    });

module.exports = mongoose.model('user', userSchema);