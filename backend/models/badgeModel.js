let mongoose = require('mongoose');

let badgeSchema = new mongoose.Schema({
        name : String,
        desc : String,
        courseId: mongoose.ObjectId,
        imageUrl: String,
    });

module.exports = mongoose.model('badge', badgeSchema);