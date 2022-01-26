//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const { isAuth } = require("../helpers/auth_middleware");
const auth  = require("../helpers/jwt-config");


//Import Controllers and Helpers for the routes
const Video = require('../models/video');
const { textSearch, getVideoById, uploadVideo, deleteVideo } = require('../controllers/video');
const { upload } = require('../helpers/multer_connection'); //Multer upload middleware

//Routes
router.get('/', (req,res) => {res.sendFile(path.join(__dirname, '..', "/public/upload.html"))}); // Simply redirects to an html page for testing purposes
router.get('/home',async (req,res) => {
    const data = await Video.find({});
    console.log(data);
    res.send(data);
})
router.post('/upload',auth, upload.single('video'), uploadVideo); //Middleware uploads to S3 while controllers update DB
router.get('/delete/:videoId', deleteVideo);
router.get('/search', textSearch);
router.get('/:videoId', getVideoById);

module.exports = router;