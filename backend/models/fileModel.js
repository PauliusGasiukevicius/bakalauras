let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
        name: String,
        data: Buffer,
        contentType: String,
        sectionId: mongoose.ObjectId,
        itemId: mongoose.ObjectId,
        courseId: mongoose.ObjectId
    });

module.exports = mongoose.model('file', fileSchema);