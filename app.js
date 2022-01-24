//import modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");


//import routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");

//db connection
mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
  console.log("Connected to DB");
});

//app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//session config
app.use(
  session({
    cookie:{maxAge: 6000000},
    secret: "TheSecretStringRequiredToWork",
    resave: true,
    saveUninitialized: false,
  })
);

//passport setup
require("./helpers/passport_config");
app.use(passport.initialize());
app.use(passport.session());

//routes middleware
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);
app.use("/question", questionRoutes);

//port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
