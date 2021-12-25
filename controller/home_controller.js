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

module.exports.createNewUser = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        res.redirect('/');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(err);
            return
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log(err);
                    return
                }
                console.log(user);
                res.redirect('/signin');
            });
        }
        else{
            console.log("user exits!");
            res.redirect("/");
        }
    })
}

module.exports.destroyUserSession = function(req,res){
    req.logout();
    res.redirect('/');
}