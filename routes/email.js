const express = require('express');
const router = express.Router();
const path = require('path');
const sendMail=require('../helpers/send_mail')
const Code=require('../models/codes');
const uuid = require('uuid').v4;

router.get('/', (req,res) => {res.sendFile(path.join(__dirname, '..', "/public/email.html"))});

router.post('/',async (req,res,next)=>{
    try{
        let email=req.body.email;
        let ucode = uuid();
        await sendMail(email,`http://localhost:5000/auth/signup/${ucode}`);
        let code=new Code({code:ucode,email});
        await code.save();
        res.send({status:"Done"});
    }
    catch(err)
    {
        next(err);
    }
})

module.exports = router;