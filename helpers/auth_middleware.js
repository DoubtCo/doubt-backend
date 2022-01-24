//Provides middleware to check if user is Authenticated/Admin

exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        console.log('Seems like you are not authorized');
        req.session.returnTo = req.originalUrl;
        res.redirect("/auth/signin")
    }
}

exports.isAdmin = (req,res,next) => {
    if(req.isAuthenticated() && req.user.role === 1){
        next();
    }else{
        res.status(401).json({message: 'Seems like you are not an admin. You need to be an admin to access this route'});
    }    
}