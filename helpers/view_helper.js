const Question = require("../models/question")
const Solution = require("../models/solution")

exports.addView = async (req, res, next) => {
    try {
        const ip = req.ip;
        if (req.query.type == 'question') {
            let question = await Question.findById(req.params.id);
            for (var i = 0; i < question.ips.length; i++) {
                if (question.ips[i].ip == ip) {
                    question.ips[i].count = min(question.ips[i].count + 1, 3);
                    break;
                }
            }

            question.ips.push({
                ip: ip,
                count: 1
            });
            question.views++;
            question.save();

        }
        else if (req.query.type == 'solution') {
            let solution = await Solution.findById(req.params.id);
            for (var i = 0; i < solution.ips.length; i++) {
                if (solution.ips[i].ip == ip) {
                    solution.ips[i].count = min(solution.ips[i].count + 1, 3);
                    break;
                }
            }
            solution.ips.push({
                ip: ip,
                count: 1
            });
            solution.views++;
            solution.save();
        }
        next();
    }
    catch (err) {
        next(err);
    }
}