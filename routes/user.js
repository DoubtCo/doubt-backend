const router = require("express").Router();

const auth = require("../helpers/jwt-config");
const { viewUser, editProfile, toggleFavorite } = require("../controllers/user");

router.get("/", auth, (req, res) => {
  res.send(req.user);
});

router.get("/:userid", viewUser);
router.post("/edit/:field",auth, editProfile);
router.post("/favorite/:solutionId", auth, toggleFavorite);
router.post("/create");

module.exports = router;
