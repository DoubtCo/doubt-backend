const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    message: String
})

module.exports = new mongoose.model("form", formSchema);