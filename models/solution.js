const mongoose = require('mongoose');

let solutionSchema=new mongoose.Schema({
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
    note:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'note'
    }],
    report:[{
        reason:{
          type:String
        },
        user:{
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'solution'
        }
    }],
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    view:{
        type:Number,
        default:0
    }
},{timestamps:true});

solutionSchema.virtual('reportCount').get(function () {
    return this.report.length
});


module.exports = mongoose.model('solution', solutionSchema);