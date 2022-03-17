const Tag = require("../models/tag");

exports.tagGen = async (req, res, next) => {
  // const tags = req.body.tags;
  // const tagsArray = await tags.map(async (thisTag) => {
  //   let tagId;

  //   const foundTag = await Tag.findOne({ tag: thisTag });
  //   if (foundTag) {
  //     tagId = foundTag._id;
  //   } else {
  //     const newTag = new Tag({
  //       tag: thisTag,
  //     });

  //     tagId = newTag._id;
  //     await newTag.save();
  //   }
  //   return tagId;
  // });
  // const TaGs = await Promise.all(tagsArray);
  // req.tagsArray = TaGs;
  next();
};
