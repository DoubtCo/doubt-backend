const router = require("express").Router();

const auth = require("../helpers/jwt-config");
const { viewUser, editProfile } = require("../controllers/user");

router.get("/", auth, (req, res) => {
  res.send(req.user);
});

router.get("/:userid", viewUser);
router.post("/edit/:field", editProfile);
router.post("/create");

module.exports = router;
