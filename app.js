//import modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const template=require('./watermark.json');
const path = require("path");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const Code = require('./models/codes');
const client=require("twilio")(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);
//import routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const cookieParser = require("cookie-parser");

//db connection
mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
  console.log("Connected to DB");
});

//app
const app = express();

//middleware
// app.enable('trust proxy');
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


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
app.use(cookieParser());

//routes middleware
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);
app.use("/question", questionRoutes);
app.post('/phoneVerify',async (req,res,next)=>{
  let num="+91"+req.body.number;
  client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+18065152334',
     to: '+919978900829'
   })
  .then(message =>res.send(message));
})
app.get('/emailVerify/:code',async(req,res,next)=>{
  try{
    let code=req.params.code;
    let found=await Code.findOne({code});
    let status;
    if(found)
    {
      status="Done";
    }
    else{
      status="Fail";
    }
    res.send(status);
  }
  catch(err)
  {
    next(err);
  }
})

app.post('/watermark',async (req,res,next)=>{
  try{
    
  }
  catch(err)
  {
    next(err);
  }
})


app.use(function (err, req, res, next) {
  res.status(err.status||500).send({status:err.status||500,error:err.message});
})
//port
const port = process.env.PORT || 5000;
app.listen(5001, () => console.log(`Listening on port ${5001}`));

// const secureServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem')),
// }, app);

// secureServer.listen(port, () => console.log(`Secure server 🚀🔑 on port ${port}`))
