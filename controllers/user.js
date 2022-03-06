const User = require("../models/user");

const {
  encryptPassword,
  validatePassword,
} = require("../helpers/password_methods");

const { createAvatar } = require("@dicebear/avatars");
const style = require("@dicebear/avatars-bottts-sprites");

exports.viewUser = async (req, res, next) => {
  const userid = req.params.userid;

  User.findOne({ _id: userid }, { _id: 0, name: 1, about: 1 }).then(
    (user, err) => {
      if (!user) {
        next("No user found");
      } else if (user) {
        res.send(user);
      } else if (err) {
        next(err);
      }
    }
  );
};

exports.editProfile = async (req, res) => {
  if (req.params.field == "password") {
    const oldPassword = req.params.oldPassword;
    const newPassword = req.params.newPassword;

    const user = req.user;
    if (validatePassword(oldPassword, user.salt, user.hash)) {
      const { salt, hash } = encryptPassword(newPassword);

      User.findOne({ _id: req.user._id }, async (foundUser, err) => {
        if (foundUser) {
          foundUser.salt = salt;
          foundUser.hash = hash;

          await foundUser.save();
          res.send("Password Changed");
        } else if (err) {
          res.send(err);
        } else {
          res.send("User not found");
        }
      });
    } else {
      res.send({ message: "Wrong Password Entered" });
    }
  }
};
