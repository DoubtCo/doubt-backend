const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
//Schema for users
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxlength: 32
    },
    email:{          //email field, named username for passport-local-mongoose to work
        type: String,   //password field saved automatically by passport-local-mongoose
        trim: true,
        required: true,
        unique: 32
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type: String,
        trim: true
    },
    role:{              //0 for user, 1 for admin
        type: Number,
        default:0
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    hash: String,
    salt: String
}, {timestamps: true});

userSchema.methods.createAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens=user.tokens.concat({token:token});//.concat combines two or more array
    // console.log(user);
    await user.save();
    return token;
}
module.exports = mongoose.model('User', userSchema);