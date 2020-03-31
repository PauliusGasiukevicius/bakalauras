let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
        courseId: mongoose.ObjectId,
        userId: mongoose.ObjectId,
        userName: String,
        title: String,
        content: String,
        creation_date: Date,
        edit_date: Date,
        upvotes: Number,
        replies: Number
    });

module.exports = mongoose.model('question', questionSchema);