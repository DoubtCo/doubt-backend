const mongoose = require("mongoose");
const User = require("./user");

const questionSchema = new mongoose.Schema({
  questionTitle: String,
  questionDesc: String,
  answerStatus: {
    type: Boolean,
    default: false,
  },
  askedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  solutionId: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "solution",
    },
  ],
  tags: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "tag",
    },
  ],
  image: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'image'
  }],
});

questionSchema.virtual("solutionCount").get(function () {
  let solutionCount;
  if (this.solutionId) {
    solutionCount = this.solutionId.length;
  } else {
    solutionCount = 0;
  }
  return solutionCount;
});

module.exports = new mongoose.model("question", questionSchema);
