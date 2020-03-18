let mongoose = require('mongoose');

let courseContentSectionItemSchema = new mongoose.Schema({
        courseId : mongoose.ObjectId,        
        courseContentSectionId : mongoose.ObjectId,
        name: String,
        location: String,
        type: String,
        text: String
    });

module.exports = mongoose.model('courseContentSectionItem', courseContentSectionItemSchema);