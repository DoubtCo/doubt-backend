//Dependencies
const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');

//Controllers
const { signUp, signIn, signOut } = require('../controllers/auth');

//Routes
router.get('/signup', (req,res) => {res.sendFile(path.join(__dirname,'..',"public/signup.html"))}); // Simply redirects to an html page for testing purposes
router.get('/signin', (req,res) => {res.sendFile(path.join(__dirname,'..', "/public/signin.html"))}); // Simply redirects to an html page for testing purposes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut)

module.exports = router;