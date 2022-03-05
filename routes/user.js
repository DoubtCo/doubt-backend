const router = require("express").Router();

const auth = require("../helpers/jwt-config");
const { viewUser } = require("../controllers/user");

router.get("/", auth, (req, res) => {
  res.send(req.user);
});

router.get("/:userid", viewUser);
router.post("/create");

module.exports = router;
