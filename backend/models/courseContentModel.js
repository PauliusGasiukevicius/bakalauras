let mongoose = require('mongoose');

let courseContentSchema = new mongoose.Schema({
        courseId : mongoose.ObjectId,    
        sections: [mongoose.ObjectId]
    });

module.exports = mongoose.model('courseContent', courseContentSchema);