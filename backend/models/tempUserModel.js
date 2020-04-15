let mongoose = require('mongoose');

let tempUserSchema = new mongoose.Schema({
        passwordHash: String,
        name : String,
        email : String,
    });

module.exports = mongoose.model('tempUser', tempUserSchema);