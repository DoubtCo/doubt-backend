const Question = require("../models/question")
const Solution = require("../models/solution")

exports.addView = async(req,res,next)=>{
    try{
        const ip = req.ip;   
        if(req.query.type=='question')
        {
            let question=await Question.findById(req.params.id);
            const index = question.ips.indexOf(ip);
            if (index == -1){
                question.ips.push(ip);
                question.views++;
                question.save();
            }
        }
        else if(req.query.type=='solution'){
            let solution=await Solution.findById(req.params.id);
            const index = solution.ips.indexOf(ip);
            if (index == -1){
                solution.ips.push(ip);
                solution.views++;
                solution.save();
            }
        }
        next();
    }
    catch(err)
    {
        next(err);
    }
}