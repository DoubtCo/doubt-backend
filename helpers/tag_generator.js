//Middleware to link tag Schemas to Question Schema
//<--- UNDER CONSTRUCTION --->

const Tag = require("../models/tag");

exports.tagGenerator = (req, res, next) => {
  const tagsString = req.body.questionTags;
  const tags = tagsString.trim().split(" ");


  // tags.forEach(async(tag) => {
  //   await Tag.findOrCreate({ tag: tag }, (err, resultTag) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       // console.log(resultTag._id);
  //       req.tagIds.push(resultTag._id);
  //     }
  //   });
  // });
  
async function tagGen(tags){
  req.tagIds = [];
  for(const tag of tags){
    await Tag.findOrCreate({ tag: tag }, (err, resultTag) => {
      if (err) {
        res.send(err);
      } else {
        console.log(resultTag._id);
        req.tagIds.push(resultTag._id);
      }
    });
  }
}

  tagGen(tags);
  console.log(req.tagIds);
  next();
};
