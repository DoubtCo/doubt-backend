//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');

//Controllers and Helpers
const { askQuestion, listQuestions } = require("../controllers/question");
const { isAuth } = require("../helpers/auth_middleware")
const { tagGenerator } = require("../helpers/tag_generator");

//Routes
router.get('/ask', isAuth, (req,res) => {res.sendFile(path.join(__dirname,'..','/public/question.html'))});
router.post('/ask', isAuth, tagGenerator, askQuestion);
router.get('/list', listQuestions);

module.exports = router;