const router = require("express").Router();
const {
  contact,
  ip,
  countIp,
  solutionDetails,
} = require("../controllers/general");

router.post("/contact", contact);
router.get("/ip", ip);

router.get("/solution/:solutionId", solutionDetails);
module.exports = router;
