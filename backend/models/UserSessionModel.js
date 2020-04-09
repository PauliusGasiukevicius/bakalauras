let mongoose = require('mongoose');

let userSessionSchema = new mongoose.Schema({
        userId: mongoose.ObjectId,
        creationDate: Date
    });

module.exports = mongoose.model('userSession', userSessionSchema);