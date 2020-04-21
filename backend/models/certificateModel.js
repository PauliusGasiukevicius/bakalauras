let mongoose = require('mongoose');

let certificateSchema = new mongoose.Schema({
        message : String,
        courseId: mongoose.ObjectId,
        imageUrl: String,
    });

module.exports = mongoose.model('certificate', certificateSchema);