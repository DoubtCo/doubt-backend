const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "464319972305-p81cg2nqfs3atlfhgkis3c805a8rih49.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
async function verify(token, user) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // console.log(userid);
    user = userid;
    return payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  } catch (err) {
    return { error: err.message };
  }
}
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log(token);
    let payload = await verify(token);
    // console.log(payload);
    if (!payload.error) {
      //   console.log(payload);
      req.user = await User.findOne({
        email: payload.email,
        "tokens.token": token,
      });
    } else {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: decode._id, "tokens.token": token });
    }
    // console.log(req.user);
    if (!req.user) {
      throw new Error();
    }
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;
