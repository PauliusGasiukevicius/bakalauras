let mongoose = require('mongoose');

let courseRatingSchema = new mongoose.Schema({
        userId: mongoose.ObjectId,
        courseId: mongoose.ObjectId,
        value: Number
    });

module.exports = mongoose.model('courseRating', courseRatingSchema);