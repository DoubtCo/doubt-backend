const uuid = require("uuid").v4;
//Dependencies
const express = require("express");
const schedule = require("node-schedule");
const passport = require("passport");
const router = express.Router();
const path = require("path");
const Code = require("../models/codes");
const User = require("../models/user");
//Controllers
const {  sessionSignUp,  sessionSignIn,  signOut,  jwtSignUp,  jwtSignIn, verifySignUp} = require("../controllers/auth");
const { generateVerificationMail, forgetPassword, changePassword } = require("../controllers/account");
const sendMail = require("../helpers/send_mail");
const Pass = require("../models/forgetPasswordCodes");
const mail = require("../helpers/send_mail");

//Routes
router.get("/signin", (req, res) => res.sendFile(path.join(__dirname, "..", "/public/signin.html")));
router.post("/signin", jwtSignIn);

router.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "..", "/public/signup.html")));
router.post("/signup", jwtSignUp, generateVerificationMail);
router.get("/signup/:code", verifySignUp);

router.get("/forgetPassword", (req, res) => res.sendFile(path.join(__dirname, "..", "/public/email.html")));
router.post("/forgetPassword", forgetPassword);

router.get("/changePassword/:code", async (req, res, next) => res.sendFile(path.join(__dirname, "..", "/public/forget.html")));
router.post("/changePassword/:code", changePassword);

// router.post("/signup", signUp);
// router.post("/signin", signIn);
router.get("/signout", signOut);
module.exports = router;
