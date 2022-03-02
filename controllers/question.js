const Question = require('../models/question');

exports.askQuestion = async (req,res,next) => {
    try{
        const newQuestion = new Question({
            questionTitle: req.body.questionTitle,
            questionDesc: req.body.questionDesc,
            // askedBy: req.user._id,
            // tags:tagsArray
        });
        
        newQuestion.save();
        res.send("Question Submitted Successfully.");
    }
    catch(err){
        next(err);
    }
}

exports.listQuestions = (req,res) => {
    Question.find({answerStatus: false}, {_id:1, questionTitle:1, questionDesc:1}, function(err,docs){
        if(err){res.json({error: err})}
        else{
            res.send(docs);
        }
    })
}