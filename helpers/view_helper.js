const Question = require("../models/question")
const Solution = require("../models/solution")
exports.addView = async (req, res, next) => {
    try {
        const ip = req.ip;
        if (req.query.type == 'question') {
            let flag=false;
            let question = await Question.findById(req.params.id);
            for (var i = 0; i < question.ips.length; i++) {
                if (question.ips[i].ip == ip) {
                    question.ips[i].count++;
                    if(question.ips[i].count>5)
                    {
                        question.ips[i].count=5;
                    }
                    else{
                        question.views++;
                    }
                    flag=true;
                    break;
                }
            }
            if(!flag)
            {
                question.ips.push({
                    ip: ip,
                    count: 1
                });
                question.views++;
            }
            await question.save();
        }
        else if (req.query.type == 'solution') {
            let flag=false;
            let solution = await Solution.findById(req.params.id);
            for (var i = 0; i < solution.ips.length; i++) {
                if (solution.ips[i].ip == ip) {
                    solution.ips[i].count++;
                    if(solution.ips[i].count>5)
                    {
                        solution.ips[i].count=5;
                    }
                    else{
                        solution.views++;
                    }
                    flag=true;
                    break;
                }
            }
            if(!flag)
            {
                solution.ips.push({
                    ip: ip,
                    count: 1
                });
                solution.views++;
            }
            await solution.save();
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
