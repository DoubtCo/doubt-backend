const mongoose = require('mongoose');

let solutionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    video:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'video'
    },
    image:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'image'
    }],
    note:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'note'
    },
    tags:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'tag'
    }],
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
},{timestamps:true});


module.exports = mongoose.model('solution', solutionSchema);