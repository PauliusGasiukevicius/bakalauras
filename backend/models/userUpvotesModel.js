let mongoose = require('mongoose');

let userUpvotesSchema = new mongoose.Schema({
        userId: mongoose.ObjectId,
        courseId: mongoose.ObjectId,
        objectId: mongoose.ObjectId,
        type: String
    });

module.exports = mongoose.model('userUpvotes', userUpvotesSchema);