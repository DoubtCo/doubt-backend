const Question = require("../models/question");

exports.askQuestion = async (req, res, next) => {
  try {
    const newQuestion = new Question({
      questionTitle: req.body.questionTitle,
      questionDesc: req.body.questionDesc,
      //   askedBy: req.user._id,
      tags: req.tagsArray,
    });

    newQuestion.save();
    res.send("Question Submitted Successfully.");
  } catch (err) {
    next(err);
  }
};

exports.listQuestions = async (req, res) => {
  Question.find(
    { answerStatus: false },
    { _id: 1, questionTitle: 1, questionDesc: 1, tags: 1 },
    function (err, docs) {
      if (err) {
        res.json({ error: err });
      } else {
        res.send(docs);
      }
    }
  );

  // await Question.find()
  //   .select("_id questionTitle questionDesc tags")
  // .exec()
  // .then((err, questions) => {
  //   console.log(questions);
  //   if (err) {
  //     res.json({ error: err });
  //   } else {
  //     res.send(questions);
  //   }
  // });
};

exports.questionDetails = async (req, res) => {
  let question = await Question.findById(req.params.id);

  if (!question) {
    res.send("not found");
  }
  res.send(question);

  console.log(question);
};
