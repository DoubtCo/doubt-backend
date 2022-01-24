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
  videoId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'video'
  },
  tags: [String]
});

module.exports = new mongoose.model('Question', questionSchema);