//Dependencies
const uuid = require("uuid").v4;
const sendMail = require('../helpers/send_mail');

//DB Models
const Code = require("../models/codes");
const User = require("../models/user");

//Functions
exports.generateVerificationMail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const ucode = uuid();

    await sendMail(
      email,
      'Please Activate Your Doubt Account',
      `Click on the link below to activate your account - https://localhost:5001/auth/signup/${ucode}`
    );
    
    const code = new Code({ code: ucode, email, codeType: 'verify'});

    setTimeout(async () => {
      await Code.findByIdAndDelete(code._id);
    }, 1000000);
    await code.save();
    res.send({ status: "Email has been sent." });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const code = req.params.code;
    const found = await Code.findOne({ code });
    const status;

    if (found) {
      status = "Done";
      next();
    } else {
      status = "Fail";
      res.redirect("/auth/signup");
    }
  } catch (err) {
    next(err);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const code = uuid();
    const found = await User.findOne({ email: req.body.email });

    if (found){
      const Pcode = new Code({ code, email: req.body.email, codeType:'forget' });
      await Pcode.save();

      sendMail(
        req.body.email,
        'Password Changed',
        `Please follow this link to reset your password - https://localhost:5001/auth/changePassword/${code}`
      );

      setTimeout(async () => {
        await Pass.findByIdAndDelete(Pcode._id);
      }, 3600000);

      res.send({ status: "Password has been sent to registered email." });
    } else {
      res.send({ status: "No registered email found." });
    }
  } catch (err) {
    next(err);
  }
}

exports.changePassword = async (req, res, next) => {
  try {
    const email = code.email;
    const user = await User.findOne({ email: email });
    const code = await Code.findOne({ code: req.params.code });

    user.password = req.body.password;
    await user.save();
    await Code.findByIdAndDelete(code._id);
    res.send({ status: "Password Changed" });
  } catch (err) {
    next(err);
  }
}
