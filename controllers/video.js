const Video = require("../models/video"); //import DB Schema for DB CRUD operations
const { s3 } = require("../helpers/s3_config");

//Controller to delete video from S3 first and then from DB
exports.deleteVideo = async (req, res) => {
  await Video.find({ videoId: req.params.videoId }, (err, vid) => {
    if (!err) {
      var params = { Bucket: vid[0].videoBucket, Key: vid[0].videoId };

      s3.deleteObject(params, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Deletion Successful");
        }
      });
    }
  })
    .clone()
    .exec();

  Video.findOneAndDelete({ videoId: req.params.videoId }, (err) => {
    if (!err) {
      console.log("Deleted from DB");
    } else {
      console.log(err);
    }
  });
  return res.json({ status: "OK" });
};

//Controller to add video to DB
exports.uploadVideo = async (req, res, next) => {
  try {
    const [vid] = req.files.video;
    console.log(vid);
    // console.log(req.file);
    var newVid = new Video({
      videoId: vid.key,
      videoBucket: vid.bucket,
      videoURL: vid.location,
      videoTitle: req.body.videoTitle,
      videoDesc: req.body.videoDesc,
      uploadedBy: req.user._id,
    });
    // console.log(req.file);
    console.log(req.files);
    console.log(newVid);
    if (newVid.videoId) {
      // let product = await Product.findById(req.params.productid);
      for (let i = 0; i < req.files.length; i++) {
        let buffer = await sharp(req.files[i].buffer)
          .resize({ width: 300, height: 300 })
          .png()
          .toBuffer();
        newVid.images.push(buffer);
      }
      res.send("Images saved successfully");
    } else {
      throw new Error("Please try again with valid product id");
    }
    // await newVid.save();
    console.log("Uploaded");
    res.json({ status: "OK" });
    // res.redirect("/video/"
  } catch (err) {
    next(err);
  }
};

//Controller to find video by id
exports.getVideoById = (req, res) => {
  Video.find({ videoId: req.params.videoId }, (err, result) => {
    if (!err) {
      console.log(req.params);
      console.log(result[0]);
      res.send(result[0]);
    } else {
      console.log(err);
    }
  });
};

//Controller for text based search
exports.textSearch = async (req, res) => {
  console.log(req.query.searchText);
  let words = req.query.searchText.split(" ");
  let result = ``;
  words.forEach((element) => {
    result += `(?=.*${element})`;
  });
  console.log(result);
  // Video.find({$text: {$search: searchText}}, {_id:0, videoTitle:1, videoDesc:1}).limit(10)
  // .exec(function(err, docs){
  //     if(!err){
  //         res.send(docs);
  //     }
  //     else{
  //         res.send(err);
  //     }
  // });
  let video1 = new Array();
  video1 = await Video.find(
    {
      $or: [
        { videoTitle: { $regex: `${result}`, $options: "i" } },
        { videoDesc: { $regex: `${result}`, $options: "i" } },
      ],
    },
    { _id: 1, videoTitle: 1, videoDesc: 1 }
  ).limit(10);
  console.log(video1);
  result = ``;
  result += `(${words[0]})`;
  for (let i = 1; i < words.length; i++) {
    result += `|(${words[i]})`;
  }
  let video2 = new Array();
  video2 = await Video.find(
    {
      $or: [
        { videoTitle: { $regex: `${result}`, $options: "i" } },
        { videoDesc: { $regex: `${result}`, $options: "i" } },
      ],
    },
    { _id: 1, videoTitle: 1, videoDesc: 1 }
  ).limit(10);
  console.log(video2);
  let indexes = new Array();
  video2.forEach((element, index) => {
    video1.forEach((item) => {
      if (item._id.toString() == element._id.toString()) {
        indexes.push(index);
      }
    });
  });
  for (let i = indexes.length - 1; i >= 0; i--) {
    video2.splice(indexes[i], 1);
  }
  const video = [...video1, ...video2];
  if (video.length > 0) {
    res.send(video);
  } else {
    res.send("Not Found");
  }
};
