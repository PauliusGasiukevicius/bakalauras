let mongoose = require('mongoose');

let courseContentSectionItemSchema = new mongoose.Schema({
        courseId : mongoose.ObjectId,        
        name: String,
        location: String,
        type: String
    });

module.exports = mongoose.model('courseContentSectionItem', courseContentSectionItemSchema);