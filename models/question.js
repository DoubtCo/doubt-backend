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
    ref: 'user'
  },
  solutionId: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'solution'
  }],
  tags:[{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'tag'
  }]
});

module.exports = new mongoose.model('Question', questionSchema);