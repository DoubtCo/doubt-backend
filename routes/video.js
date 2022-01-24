//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const { isAuth } = require("../helpers/auth_middleware");

//Import Controllers and Helpers for the routes
const { textSearch, getVideoById, uploadVideo, deleteVideo } = require('../controllers/video');
const { upload } = require('../helpers/multer_connection'); //Multer upload middleware

//Routes
router.get('/', (req,res) => {res.sendFile(path.join(__dirname, '..', "/public/upload.html"))}); // Simply redirects to an html page for testing purposes
router.post('/upload',isAuth, upload.single('video'), uploadVideo); //Middleware uploads to S3 while controllers update DB
router.get('/delete/:videoId', deleteVideo);
router.get('/search', textSearch);
router.get('/:videoId', getVideoById);

module.exports = router;