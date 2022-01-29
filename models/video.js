const mongoose = require('mongoose');

//Schema for videos
const videoSchema = new mongoose.Schema({
    // videoId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    videoBucket: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    // videoTitle: {
    //     type: String,
    //     required: true
    // }
    // uploadedBy: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'user'
    // },
    // comments: [{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref: 'comment'
    // }],
    thumbnail:{
        type: String
    }
}, {timestamps: true});

//Index to make text based search from title and description possible

module.exports = mongoose.model('Video', videoSchema);