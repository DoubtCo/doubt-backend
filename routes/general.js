const router = require("express").Router();
const { contact } = require("../controllers/general");

router.post("/contact", contact);

module.exports = router;