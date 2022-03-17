exports.isUploader=(req,res,next)=>{
    if(req.user.role>=1)
    {
        next();
    }
    else{
        res.status(401).send({ error: "You are Not authorised Authenticate" });
    }
}