const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:String,
    commentor: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
},{timestamps: true});

module.exports = new mongoose.model('Comment', commentSchema);