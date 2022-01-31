const findOrCreate = require('mongoose-find-or-create');
const Question = require('../models/question');
const Tag = require('../models/tag');

exports.askQuestion = async (req,res) => {
    try{
        let tagsArray=new Array;
        console.log(req.body.questionTags.split(" "));
        req.body.questionTags.split(" ").forEach(async(item)=>{
            let temp=new Tag({
                tag:item
            });
            tagsArray.push(temp._id);
            await temp.save();
        });
        console.log(tagsArray);
        const newQuestion = new Question({
            questionTitle: req.body.questionTitle,
            questionDesc: req.body.questionDesc,
            askedBy: req.user._id,
            tags:tagsArray
        });
        
        console.log(newQuestion);

        newQuestion.save();
        res.send(newQuestion);
    }
    catch(err)
    {
        next(err);
    }
    // res.redirect('/video/');
}

exports.listQuestions = (req,res) => {
    Question.find({answerStatus: false}, {_id:1, questionTitle:1, questionDesc:1}, function(err,docs){
        if(err){res.json({error: err})}
        else{
            res.send(docs);
        }
    })
}