const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

//Schema for users
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxlength: 32
    },
    email:{             
        type: String,   
        trim: true,
        required: true,
        unique: 32
    },
    phone:{
        type:Number
    },
    about:{
        type: String,
        trim: true
    },
    role:{              //0 for user, 1 for admin
        type: Number,
        default:0
    },
    activationStatus: {
        type: String,
        enum: ['active', 'pending'],
        default: 'pending'
    },
    hash: String,
    salt: String,
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
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