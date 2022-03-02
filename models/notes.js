const mongoose = require('mongoose');

//Schema for notes
const noteSchema = new mongoose.Schema({
    Key: {
        type: String,
        required: true,
        unique: true
    },
    Bucket: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('note', noteSchema);