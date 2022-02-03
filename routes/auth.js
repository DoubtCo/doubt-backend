//Dependencies
const router = require("express").Router();
const path = require("path");
const auth=require('../helpers/jwt-config');
//Controllers
const {  sessionSignUp,  sessionSignIn,  signOut,  jwtSignUp,  jwtSignIn, verifySignUp} = require("../controllers/auth");
const { generateVerificationMail, forgetPassword, changePassword } = require("../controllers/account");

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

// router.post("/signup", sessionSignUp);
// router.post("/signin", sessionSignIn);
router.get("/signout",auth, signOut);
module.exports = router;
