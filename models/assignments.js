const mongoose = require("mongoose");


const assignmentSchema=new mongoose.Schema({
    college:{
        type:String,
        required:true
    },
    sem:{
        type:String,
        required:true
    },
    branch:{
        type:String,
    },
    answers:[
        {
            subjectCode:{
                type:String,
            },
            deadline:{
                type:Date
            },
            title:{
                type:String
            },
            thumbnailURL:{
                type:String
            },
            assignmentId:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'solution'
            }
        },
    ]
});
module.exports=new mongoose.model("assignment",assignmentSchema);