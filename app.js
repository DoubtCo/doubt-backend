//import modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const https = require("https");

//import routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const generalRoutes = require("./routes/general");

//db connection
mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
  console.log("Connected to DB");
});


//Model
const User=require('./models/user');


//app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// app.enable('trust proxy');
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })


//routes middleware
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);
app.use("/question", questionRoutes);
app.use("/", generalRoutes); // This must be at the bottom only

//error handler
app.use(function (err, req, res, next) {
  res.status(err.status||500).send({status:err.status||500,error:err.message});
})

//port
const port = process.env.PORT || 5000;
app.listen(5001, () => console.log(`Listening on port 5001`));

// const secureServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem')),
// }, app);

// secureServer.listen(port, () => console.log(`Secure server 🚀🔑 on port ${port}`))
