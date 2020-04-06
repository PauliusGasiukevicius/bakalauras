let mongoose = require('mongoose');

let completionSchema = new mongoose.Schema({
        userId: mongoose.ObjectId,
        courseId: mongoose.ObjectId,
        date: Date
    });

module.exports = mongoose.model('completion', completionSchema);