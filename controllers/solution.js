const Solution = require("../models/solution");
const Question = require("../models/question");
const Video = require("../models/video");
const Image = require("../models/image");
const Note = require("../models/notes");

const sendMail = require("../helpers/send_mail");
const { s3 } = require("../helpers/s3_config");
const { model } = require("mongoose");

exports.reportSolution = async (req, res) => {
  try {
    let sol = await Solution.findById(req.params.solutionId);

    const Report = {
      reason: req.query.reason,
      user: req.user._id,
    };
    sol.report.push(Report);
    await sol.save();

    if (sol.reportCount > 12) {
      await sendMail(
        "bhagyapatel50125@gmail.com",
        "Account Reported",
        `This solution has been reported a number of times. ${req.params.solutionId}`
      );
    }

    res.send("Reported!");
  } catch (error) {
    res.send(error);
  }
};

exports.uploadSolution = async (req, res) => {
  try {
    let [vid] = req.files.video || undefined;
    let videoID = undefined;
    if (vid) {
      let newVideo = new Video({
        Key: vid.key,
        Bucket: vid.bucket,
        URL: vid.location,
      });
      videoID = newVideo._id;
      await newVideo.save();
    }

    let img = req.files.image || undefined;
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

    let note = req.files.notes || undefined;
    let notesArray = [];
    if (note) {
      note.forEach(async (note) => {
        let newNote = new Note({
          Key: note.key,
          Bucket: note.bucket,
          URL: note.location,
        });
        notesArray.push(newNote._id);
        await newNote.save();
      });
    }

    let solution = new Solution({
      description: req.body.description || undefined,
      video: videoID,
      image: imagesArray,
      note: notesArray,
      // createdBy: req.user._id
    });
    await solution.save();

    let question = await Question.findById(req.params.questionID);
    console.log(question);
    question.solutionId.push(solution._id);
    await question.save();

    res.send({ status: "Uploaded", id: solution._id });
  } catch (error) {
    res.send(error);
  }
};

deleteObjectName = async (objectName, model, objectId) => {
  const object = await model.findById(objectId);
  if (object) {
    const params = { Bucket: object.Bucket, Key: object.Key };

    s3.deleteObject(params, (err) => {
      if (err) {
        console.log(err);
      }
    })
      .promise()
      .then(
        model.findByIdAndDelete(objectId, () => {
          console.log(`${objectName} deleted`);
        })
      );
  }
};

deleteSolution = async (solutionId) => {
  let solution = await Solution.findById(solutionId);
  if (solution) {
    const { video: videoId, image: imageIdArray, note: noteIdArray } = solution;

    deleteObjectName("video", Video, videoId);

    imageIdArray.forEach((imageId) => {
      deleteObjectName("image", Image, imageId);
    });

    noteIdArray.forEach((noteId) => {
      deleteObjectName("note", Note, noteId);
    });

    await Solution.findByIdAndDelete(solutionId);
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    console.log(req.params.solutionID);
    if (req.params.solutionID) {
      let solution = await Solution.findById(req.params.solutionID);
      if (solution) {
        deleteSolution(req.params.solutionID);

        await Question.updateOne(
          { _id: req.params.questionID },
          { $pull: { solutionId: req.params.solutionID } }
        );
      }
    } else {
      let question = await Question.findById(req.params.questionID);
      question.solutionId.forEach((solution) => {
        deleteSolution(solution.valueOf());
      });

      await Question.findByIdAndDelete(req.params.questionID);
    }

    res.send("OK");
  } catch (error) {
    res.send(error);
  }
};
