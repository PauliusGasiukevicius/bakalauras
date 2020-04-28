let mongoose = require('mongoose');

let forgotPassSchema = new mongoose.Schema({
        email : String
    });

module.exports = mongoose.model('forgotPass', forgotPassSchema);