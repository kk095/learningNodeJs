const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID : "32738030380-shk882gdipst6v9ih2ubdit6nfp9ev57.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://127.0.0.1:8000/user/auth/google/callback"
},

function(accessToken,refreshToken,profile,done){
    User.findOne({email : profile.emails[0].value }).exec(function(err,user){
        if(err){
            console.log("error in google auth passport",err);
            return;
        }
        // console.log(profile);
        if(user){
            return done(null,user);

        }
        else{
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString("hex"),
                avatar : profile.photos[0].value
            },function(err,user){
                if(err){
                    console.log("error in creating user in  google auth passport",err);
                    return;
                }
                if(user){
                    return done(null,user);
                }
            })
        }
    })
}


));


module.exports = passport;