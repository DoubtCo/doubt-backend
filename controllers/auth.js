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
