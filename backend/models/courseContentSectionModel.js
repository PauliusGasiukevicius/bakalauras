let mongoose = require('mongoose');

let courseContentSectionSchema = new mongoose.Schema({
        courseId : mongoose.ObjectId,    
        name: String,
        items: [mongoose.ObjectId]
    });

module.exports = mongoose.model('courseContentSection', courseContentSectionSchema);