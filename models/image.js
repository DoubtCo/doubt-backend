const mongoose = require('mongoose');

//Schema for images
const imageSchema = new mongoose.Schema({
    // imageId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    imageBucket: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    // uploadedBy: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'user'
    // },
    // comments: [{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref: 'comment'
    // }],
}, {timestamps: true});

//Index to make text based search from title and description possible

module.exports = mongoose.model('image', imageSchema);