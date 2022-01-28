//Middleware to upload video to Amazon S3

const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');
const { s3 } = require('../helpers/s3_config');

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',                 //Read only access to public
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
            const title = req.body.videoTitle;
            const og = file.originalname;
            const ext = path.extname(file.originalname);
            cb(null, `${title}-${uuid()}${ext}`);    //Generates Unique name for Video
        }
    })
})


exports.uploadImage = multer({
    limits: {
        fileSize: 500000
    },
    fileFilter(req, files, done) {
        if (!files.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return done(new Error('Please Upload an image'));
        }
        done(undefined, true);
    }
});