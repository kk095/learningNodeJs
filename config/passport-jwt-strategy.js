const passport = require('passport');
const JwtPassport = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('./environment');
let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.passport_jwt_key
}

passport.use(new JwtPassport(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,data){
        if(err){
            console.log("error in jwt-passport strategy =>",err);
        }
        if(data){
            done(null,data);
        }
        else{
            done(null,false);
        }
    })
}) )


module.exports = passport;