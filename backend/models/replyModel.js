let mongoose = require('mongoose');

let replySchema = new mongoose.Schema({
        questionId: mongoose.ObjectId,
        userId: mongoose.ObjectId,
        userName: String,
        content: String,
        creation_date: Date,
        edit_date: Date,
        upvotes: Number
    });

module.exports = mongoose.model('reply', replySchema);