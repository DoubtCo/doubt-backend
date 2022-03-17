const express = require("express");
const auth=require("../helpers/jwt-config");
const {isUploader}=require("../helpers/check_assignment_upload");
const router = express.Router();

const { upload } = require("../helpers/multer_connection");
const { assignmentUpload, getAllAssignments } = require("../controllers/assignment");

router.get("/:college/:semester/:branch", getAllAssignments);
router.post("/:college/:semester/:branch/upload",auth,isUploader, upload.fields([{name: "notes", maxCount:3},{name:"thumbnail",maxCount:1}]), assignmentUpload);

module.exports = router;