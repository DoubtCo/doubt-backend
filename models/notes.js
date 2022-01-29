const mongoose = require('mongoose');

//Schema for notes
const noteSchema = new mongoose.Schema({
    // noteId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    noteBucket: {
        type: String,
        required: true
    },
    noteURL: {
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


module.exports = mongoose.model('note', noteSchema);