const Solution = require("../models/solution");
const sendMail = require("../helpers/send_mail");

exports.reportSolution = async (req, res) => {
    try {
        
        let sol = await Solution.findById(req.params.solutionId);
        
        const Report = {
            reason: req.query.reason,
            user: req.user._id
        }
        sol.report.push(Report);
        await sol.save();
        
        if(sol.reportCount > 12){
            await sendMail("bhagyapatel50125@gmail.com", "Account Reported", `This solution has been reported a number of times. ${req.params.solutionId}`);
        }
        
        res.send("Reported!"); 
    } catch (error) {
        res.send(error)
    }
    
}