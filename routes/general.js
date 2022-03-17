const router = require("express").Router();
const { contact, ip,countIp } = require("../controllers/general");

router.post("/contact", contact);
router.get("/ip", ip);
module.exports = router;