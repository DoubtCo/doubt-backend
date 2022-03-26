const Solution = require("../models/solution");
const Note = require("../models/notes");
const Assignment = require("../models/assignments");
const User = require("../models/user");

exports.assignmentUpload = async (req, res) => {
  try {
    let note = req.files.notes;

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
      type: "assignment",
      description: req.body.description || undefined,
      note: notesArray,
      createdBy: req.user._id,
    });
    let currentUser = await User.findById(req.user._id);
    currentUser.solutionUploads.push(solution._id);
    await currentUser.save();
    await solution.save();

    const answer = {
      subjectCode: req.body.subjectCode,
      deadline: req.body.deadline,
      title: req.body.assignmentTitle,
      assignmentId: solution._id,
    };
    const foundAssignment = await Assignment.findOne({
      college: req.params.college,
      sem: req.params.semester,
      branch: req.params.branch,
    });

    if (!foundAssignment) {
      const assignment = new Assignment({
        college: req.params.college,
        sem: req.params.semester,
        branch: req.params.branch,
      });
      assignment.answers.push(answer);
      await assignment.save();
    } else {
      foundAssignment.answers.push(answer);
      await foundAssignment.save();
    }
    res.send({ status: "Success" });
  } catch (error) {
    res.send(error);
  }
};

exports.getAllAssignments = async (req, res, next) => {
  try {
    if (req.query.want == "all") {
      // const foundAssignment = await Assignment.find({
      //   college: req.params.college,
      //   sem: req.params.semester,
      //   branch: req.params.branch,
      // });

      // //   console.log(foundAssignment);

      // res.send(foundAssignment);

      await Assignment.findOne({
        college: req.params.college,
        sem: req.params.semester,
        branch: req.params.branch,
      })
        .populate("answers.assignmentId")
        .exec()
        .then((result) => {
          console.log(result);
          res.send(result);
        });
    } else {
      let foundAssignment = await Assignment.findOne({
        college: req.params.college,
        sem: req.params.semester,
        branch: req.params.branch,
      })
        .populate("answers.assignmentId")
        .populate({
          path: "answers.assignmentId",
          populate: { path: "createdBy", select: ["name"] },
        });
      let obj;
      console.log(req.query.want);
      foundAssignment.answers.forEach((item) => {
        if (item.title.toLowerCase().includes(req.query.want.toLowerCase())) {
          console.log(item);
          obj = item;
          return;
        }
      });

      res.send(obj);
    }
  } catch (err) {
    next(err);
  }
};
