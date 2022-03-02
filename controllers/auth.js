const User = require("../models/user");
const Code = require("../models/codes");
const passport = require("passport");

const {  encryptPassword,  validatePassword } = require("../helpers/password_methods");

exports.sessionSignUp = (req, res) => {
  const saltHash = encryptPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    salt: salt,
    hash: hash,
  });

  newUser.save().then(console.log(newUser));
  res.redirect("/auth/signin");
};

exports.jwtSignUp = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.data);
    const saltHash = encryptPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      hash: hash,
    });

    let token = await user.createAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5000000000),
      httpOnly: true,
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.verifySignUp = async (req, res, next) => {
  try {
    let code = req.params.code;
    console.log(code);
    let codeModel = await Code.findOne({ code });
    let email = codeModel.email;
    console.log(email);
    if (!code) {
      res.send("Check link");
    }
    if (email) {
      let user = await User.findOne({ email: email });

      if (user.activationStatus !== "active") {
        user.activationStatus = "active";
        user.save();
      }
      await Code.findByIdAndDelete(codeModel._id);
      res.send(
        "<h1>User Active</h1> <a href='http://localhost:5000/auth/signin'>Sign In</a>"
      );
    } else {
      res.send("No account with this mail found.");
    }
  } catch (err) {
    next(err);
  }
};

exports.jwtSignIn = async (req, res, next) => {
  try {
    const body = req.body;

    const user = await User.findOne({
      email: body.email,
    });

    const salt = user.salt;
    const hash = user.hash;

    const found = validatePassword(body.password, salt, hash);
    console.log(found);

    if (found) {
      if (user.activationStatus === "active") {
        let token = await user.createAuthToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 5000000000),
          httpOnly: true,
        });
        res.send({ status: "done" });
      } else if (user.activationStatus !== "active") {
        throw new Error("Please verify account through mail.");
      }
    } else {
      throw new Error("Enter Valid Credantials");
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};

exports.sessionSignIn = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/auth/signin");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(req.session.returnTo || "/video");
      delete req.session.returnTo;
      return next();
    });
  })(req, res, next);
};

exports.signOut =async(req, res,next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    // let z = schedule.scheduledJobs["job-1"];
    // if (z) {
    //   z.cancel();
    // }
    await req.user.save();
    res.send({ status: "done" });
  } catch (err) {
    next(err);
  }
};
