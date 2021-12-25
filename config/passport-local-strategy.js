const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("error in finding user in passportjs");
            return done(err);
        }
        if(!user||user.password!=password){
            console.log("invalid username/password");
            return done(null,false);
        }
        return done(null,user);
    });
}
));

// serialization

passport.serializeUser(function(User,done){
    done(null,User.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user during deserializing in passport js");
            return done(err);
        }
        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/signin')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    return next();
}

module.exports = passport;