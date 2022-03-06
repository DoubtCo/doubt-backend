const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  email: {
    type: String,
  },
  codeType: {
    type: String,
    enum: ["verify", "forget"],
  },
});

module.exports = new mongoose.model("code", codeSchema);
