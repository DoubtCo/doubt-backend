const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const tagSchema = new mongoose.Schema({
    tag:{
        type:String,
        unique: true,
        maxLength: 32 
    }
})
tagSchema.plugin(findOrCreate, {appendToArray: true})

module.exports = new mongoose.model('Tag', tagSchema)