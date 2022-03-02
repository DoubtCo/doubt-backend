//Dependencies
const express = require("express");
const router = express.Router();
const path = require("path");

const Question = require("../models/question");

//Controllers and Helpers
const { askQuestion, listQuestions } = require("../controllers/question");
const { upload } = require("../helpers/multer_connection");
const { uploadSolution, deleteQuestion } = require("../controllers/solution");
const auth = require("../helpers/jwt-config");
const { isAuth } = require("../helpers/auth_middleware");
const { tagGenerator } = require("../helpers/tag_generator");

//Routes
router.get("/ask", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/question.html"));
});
router.post("/ask", askQuestion);
router.get("/list", listQuestions);
router.get("/listQuestions", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/questionDisplay.html"));
});

router.post("/getQuestionTitle", async (req, res) => {
  let id = req.body.id;

  let question = await Question.findById(id);
  res.json({ title: question.questionTitle });
});

router.post(
  "/:questionID/answer",
  // auth,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 4 },
    { name: "notes", maxCount: 3 },
  ]),
  uploadSolution
);

router.post("/delete/:questionID/:solutionID?", deleteQuestion);

module.exports = router;
