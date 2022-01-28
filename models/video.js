const mongoose = require('mongoose');

//Schema for videos
const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    videoBucket: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    videoTitle: {
        type: String,
        required: true
    },
    videoDesc: {
        type: String
    },
    uploadedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    comments: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'comment'
    }],
    images:[{
        type:Buffer
    }]
}, {timestamps: true});

//Index to make text based search from title and description possible
videoSchema.index({videoTitle: 'text', videoDesc: 'text'}, {match: 'partial'});

module.exports = mongoose.model('Video', videoSchema);