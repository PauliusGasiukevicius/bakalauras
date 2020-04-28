let mongoose = require('mongoose');

let certificateSchema = new mongoose.Schema({
        message : String,
        courseId: mongoose.ObjectId,
        userId: mongoose.ObjectId,
    });

module.exports = mongoose.model('certificate', certificateSchema);