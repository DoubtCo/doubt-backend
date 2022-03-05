const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
  },
  students: {
    type: Number,
  },
});

module.exports = new mongoose.model("college", collegeSchema);
