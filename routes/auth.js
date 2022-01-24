//Dependencies
const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const Code=require('../models/codes');
//Controllers
const { signUp, signIn, signOut, jwtSignUp, jwtSignIn } = require('../controllers/auth');
const sendMail = require("../helpers/send_mail");

//Routes
router.get('/signup/:code',async  (req,res,next) => {
    try{
        let code=req.params.code;
        console.log(code);
        let found=await Code.findOne({code});
        let status;
        if(found)
        {
            status="Done";
            res.sendFile(path.join(__dirname,'..',"public/signup.html"))
        }
        else{
            throw new Error('Please Verify Email');
        }

    }
    catch(err)
    {
        next(err);
    }
}); // Simply redirects to an html page for testing purposes
router.get('/signin', (req,res) => {res.sendFile(path.join(__dirname,'..', "/public/signin.html"))}); // Simply redirects to an html page for testing purposes
router.post('/signup', jwtSignUp);
router.post('/signin', jwtSignIn);
// router.post("/signup", signUp);
// router.post("/signin", signIn);
router.get("/signout", signOut)
router.post("/mail",async (req,res,next)=>{
    try{
        let email=req.body.email;
        sendMail(email,"hello");
    }
    catch(err)
    {
        next(err);
    }
})

module.exports = router;