const question = require("../models/question");
const Question = require("../models/question");
const Image = require("../models/image");
const User=require("../models/user");

exports.askQuestion = async (req, res, next) => {
  try {
    console.log(req.body);

    let img = req.files.image || undefined;
    console.log(img);
    let imagesArray = [];
    if (img) {
      img.forEach(async (image) => {
        let newImage = new Image({
          Key: image.key,
          Bucket: image.bucket,
          URL: image.location,
        });
        imagesArray.push(newImage._id);
        await newImage.save();
      });
    }
    const newQuestion = new Question({
      questionTitle: req.body.questionTitle,
      questionDesc: req.body.questionDesc,
      askedBy: req.user._id,
      tags: req.tagsArray,
      image:imagesArray
    });
    let currentUser = await User.findById(req.user._id);
    currentUser.questionUploads.push(newQuestion._id);
    await currentUser.save();
    newQuestion.save();
    res.send("Question Submitted Successfully.");
  } catch (err) {
    next(err);
  }
};

exports.listQuestions = async (req, res) => {
  await Question.find()
    .select("_id questionTitle questionDesc tags solutionId")
    .populate("tags")
    .exec()
    .then((questions, err) => {
      const sendQues = questions.map((question) => {
        const questionObj = {
          ...question._doc,
          solutionCount: question.solutionCount,
        };
        return questionObj;
      });
      console.log(sendQues);
      if (err) {
        res.json({ error: err });
      } else {
        res.send(sendQues);
      }
    });
};

exports.questionDetails = async (req, res) => {
  // let question = await Question.findById(req.params.id);

  // if (!question) {
  //   res.send("not found");
  // }
  // res.send(question);

  await Question.findOne({ _id: req.params.id })
    .populate("solutionId tags askedBy")
    .exec()
    .then((questions, err) => {
      console.log(questions);
      if (err) {
        res.send(err);
      } else {
        res.send(questions);
      }
    });
};
