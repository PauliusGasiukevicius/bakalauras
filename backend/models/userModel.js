let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
        ID: String,
        name : String,
        email : String,
        imageUrl: String,
        //createdCourses: [mongoose.ObjectId],
        courses: [mongoose.ObjectId],
        badges: [mongoose.ObjectId]
    });

module.exports = mongoose.model('user', userSchema);