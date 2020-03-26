let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
        name: String,
        data: Buffer,
        contentType: String
    });

module.exports = mongoose.model('file', fileSchema);