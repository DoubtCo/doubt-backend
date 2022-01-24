const mongoose = require('mongoose');

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
    about:{
        type: String,
        trim: true
    },
    role:{              //0 for user, 1 for admin
        type: Number,
        default:0
    },
    hash: String,
    salt: String
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);