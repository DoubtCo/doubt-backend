//Configures Passport-Local to use for authentication

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const { validatePassword } = require("../helpers/password_methods")

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

verifyFunction = (username, password, done) => {
    User.findOne({email: username})
    .then((user) => {
        if(!user){ return done(null, false)}

        const isPasswordValid = validatePassword(password, user.salt, user.hash);

        if(isPasswordValid){return done(null, user)}
        else {return done(null, false)}
    })
    .catch((err) => {return done(err)});
}

const strategy = new LocalStrategy(customFields, verifyFunction);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => {
        done(null, user);
    })
    .catch((err) => {
        done(err)
    })
});