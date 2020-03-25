let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
        file: { data: Buffer, contentType: String }
    });

module.exports = mongoose.model('file', fileSchema);