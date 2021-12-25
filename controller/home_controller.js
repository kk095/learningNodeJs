const User = require('../models/user');

module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('check',20);
    res.render("home",{title:'home'});
}
module.exports.profile = function(req,res){
   return res.render("profile",{
       'title':'profile'
   })
    
}
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render("signin",{title:'signin'});
}
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render("signup",{title:'signup'});
}
module.exports.create = function(req,res){
    return res.redirect('/');   

}

