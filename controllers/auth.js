const User = require("../models/user");
const passport = require('passport');

const { encryptPassword } = require("../helpers/password_methods");

exports.signUp = (req, res) => {
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

exports.jwtSignUp = async(req,res,next) => {
try {
  let user = new User(req.body);
  let token = await user.createAuthToken();
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 5000000000),
    httpOnly: true,
  });
  res.redirect("/video/");
} catch (err) {
  next(err);
}
}

// jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVlOWY2NjI2YzA4YTA1NWYyYjQ1OTciLCJpYXQiOjE2NDMwMjgzMjZ9.VUmCtrkZ5pOrK4atu73FYKXTJW7sCFq9zvx89VX91v8


exports.jwtSignIn = async (req,res,next) => {
  try {
    const user = req.body;
    console.log(req.body);
    const found = await User.findOne({
      email: user.email,
      password: user.password,
    });
    if (found) {
      let x = 1;
      let token = await found.createAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 5000000000),
        httpOnly: true,
      });
      res.send({ status: "done" });
    } else {
      let error = new Error("Enter Valid Credantials");
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
}

exports.signIn = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {return next(err);}

    if(!user){
      return res.redirect("/auth/signin");
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect(req.session.returnTo || '/video');
      delete req.session.returnTo;
      return next();
    });
  })(req, res, next);
};

exports.signOut = (req, res) => {
  req.logout();
  res.redirect("/auth/signin");
};
