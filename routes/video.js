//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const auth  = require("../helpers/jwt-config");

//Import Controllers and Helpers for the routes
const Video = require('../models/video');
const { textSearch, getVideoById, deleteVideo, uploadSolution } = require('../controllers/video');
const { reportSolution } = require("../controllers/solution");
const { upload, uploadImage } = require('../helpers/multer_connection'); //Multer upload middleware
// const { genWatermark } = require("../helpers/watermark-creator");

//Routes
router.get('/', (req,res) => {res.sendFile(path.join(__dirname, '..', "/public/upload.html"))}); // Simply redirects to an html page for testing purposes
router.get('/solution/:id',(req,res)=>{res.sendFile(path.join(__dirname, '..', "/public/upload2.html"))});
router.post('/upload',auth,upload.fields([{name:'video',maxCount:1}, {name:'image', maxCount:4},{name:'note',maxCount:3}]),uploadSolution); //Middleware uploads to S3 while controllers update DB
router.get('/delete/:videoId', deleteVideo);
router.get('/search', textSearch);
router.get('/:videoId', getVideoById);

router.post('/report/:solutionId',auth, reportSolution);

module.exports = router;