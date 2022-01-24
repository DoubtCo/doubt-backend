const findOrCreate = require('mongoose-find-or-create');
const Question = require('../models/question');
const Tag = require('../models/tag');

exports.askQuestion = async (req,res) => {
    const newQuestion = new Question({
        questionTitle: req.body.questionTitle,
        questionDesc: req.body.questionDesc,
        askedBy: req.user._id,
        tags: req.tagIds
    });
    
    console.log(newQuestion);

    // newQuestion.save();
    res.redirect('/video/');
}

exports.listQuestions = (req,res) => {
    Question.find({answerStatus: false}, {_id:0, questionTitle:1, questionDesc:1}, function(err,docs){
        if(err){res.json({error: err})}
        else{
            res.send(docs);
        }
    })
}