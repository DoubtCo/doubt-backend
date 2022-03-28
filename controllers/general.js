const Form = require("../models/form");
const sendMail = require("../helpers/send_mail");
const question = require("../models/question");
const Question = require("../models/question");
const Solution = require("../models/solution");

exports.contact = async (req, res) => {
  const form = new Form({
    type: "Contact Request",
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  await form.save();
  await sendMail(
    "doubt.co923@gmail.com",
    "Contact Request",
    `A user has submitted a contact request. ${form._id}`
  );
  res.send("OK");
};

exports.ip = async (req, res) => {
  const IP = req.socket.remoteAddress || null;
  res.send(IP);
};

exports.countIp = async (req, res, next) => {
  if (req.query.type == "question") {
    let question = await question.findById(req.params.id);
    question.ips.push();
  }
};

exports.solutionDetails = async (req, res) => {
  await Solution.findOne({ _id: req.params.solutionId })
    .populate("video", "URL", "Video")
    .populate("image", "URL", "image")
    .populate("note", "URL", "note")
    .populate("createdBy", "name", "user")
    .exec()
    .then((solution, err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(solution);
      }
    });
};
