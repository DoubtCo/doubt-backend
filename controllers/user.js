const User = require("../models/user");

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
