let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    name : String,
    desc : String,
    creator: mongoose.ObjectId,
    imageUrl: String,
    students: Number,
    ratingsCount: Number,
    rating: Number
    });

module.exports = mongoose.model('course', courseSchema);