//import modules

const cluster=require('cluster');
const os=require('os');

if(cluster.isMaster)
{
  const n_cpus=os.cpus().length;
  for(var i=0;i<n_cpus;i++)
  {
    cluster.fork();
  }
}
else{
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
const userRoutes = require("./routes/user");
const assignmentRoutes = require("./routes/assignment");

//db connection
mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
  console.log("Connected to DB");
});

//Model
const User = require("./models/user");
const Code = require("./models/codes");
const cookieParser = require("cookie-parser");

//app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// app.enable('trust proxy');
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })

//routes middleware
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);
app.use("/question", questionRoutes);
app.use("/user", userRoutes);
app.use("/assignment", assignmentRoutes);

app.get("/google", async (req, res, next) => {
  res.sendFile(path.join(__dirname, "/public/google.html"));
});
app.post("/google/register", async (req, res, next) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.profile.tv });
    if (user) {
      user.tokens.push({ token: req.body.id_token });
      res.cookie("jwt", req.body.id_token, {
        expires: new Date(Date.now() + 5000000000),
        httpOnly: true,
      });
      await user.save();
    } else {
      let tk = new Array();
      tk.push({ token: req.body.id_token });
      let user = new User({
        name: req.body.profile.tf,
        email: req.body.profile.tv,
        activationStatus: "active",
        tokens: tk,
      });
      res.cookie("jwt", req.body.id_token, {
        expires: new Date(Date.now() + 5000000000),
        httpOnly: true,
      });
      await user.save();
    }
    console.log(user);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

app.use("/", generalRoutes); //ALWAYS AT BOTTOM OF ROUTES

//Error Handler

app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send({ status: err.status || 500, error: err.message });
});

//port
const port = process.env.PORT || 5000;
app.listen(5001, () => console.log(`Listening on port 5001`));

// const secureServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem')),
// }, app);

// secureServer.listen(port, () => console.log(`Secure server ???????? on port ${port}`))
}