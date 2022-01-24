const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-find-or-create');

const codeSchema = new mongoose.Schema({
    code:{
        type:String,
    },
    email:{
        type:String
    }
})
// tagSchema.plugin(findOrCreate, {appendToArray: true})

module.exports = new mongoose.model('code', codeSchema)