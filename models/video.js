const mongoose = require('mongoose');

//Schema for videos
const videoSchema = new mongoose.Schema({
    Key: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Video', videoSchema);