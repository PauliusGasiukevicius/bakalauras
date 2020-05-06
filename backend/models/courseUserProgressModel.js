let mongoose = require('mongoose');

let courseUserProgress = new mongoose.Schema({
        courseId: mongoose.ObjectId,
        userId: mongoose.ObjectId,
        sections: [mongoose.ObjectId],
        items: [mongoose.ObjectId]
    });

module.exports = mongoose.model('courseUserProgress', courseUserProgress);