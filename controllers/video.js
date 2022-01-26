const Video = require('../models/video');  //import DB Schema for DB CRUD operations
const { s3 } = require('../helpers/s3_config');

//Controller to delete video from S3 first and then from DB
exports.deleteVideo = async (req,res) =>{
    await Video.find({videoId: req.params.videoId}, (err,vid)=>{        
        if(!err){
            var params = {Bucket: vid[0].videoBucket, Key: vid[0].videoId};

            s3.deleteObject(params, (err)=>{
                if(err){ console.log(err); }
                else{console.log("Deletion Successful");}
            })
        }
    }).clone().exec();

    Video.findOneAndDelete({videoId: req.params.videoId}, (err) =>{
        if(!err){console.log("Deleted from DB");}
        else{console.log(err);}
    });
    return res.json({status: 'OK'});
}

//Controller to add video to DB
exports.uploadVideo = async (req,res) =>{
    // console.log(req);
    // console.log(req.file);
    var newVid = new Video({
        videoId: req.file.key,
        videoBucket: req.file.bucket,
        videoURL: req.file.location,
        videoTitle: req.body.videoTitle,
        videoDesc: req.body.videoDesc,
        uploadedBy: req.user._id
    });

    await newVid.save();
    console.log("Uploaded");
    res.json({status: "OK"});
    // res.redirect("/video/");
}

//Controller to find video by id
exports.getVideoById = (req,res) => {
    Video.find({videoId: req.params.videoId}, (err, result)=>{
        if(!err){
            console.log(req.params);
            console.log(result[0]);
            res.send(result[0]);
        }
        else{console.log(err);}
    })
}

//Controller for text based search
exports.textSearch = async (req,res) => {
    const searchText = req.query.searchText;
    console.log(searchText);
    Video.find({$text: {$search: searchText}}, {_id:0, videoTitle:1, videoDesc:1}).limit(10)
    .exec(function(err, docs){
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    });
}