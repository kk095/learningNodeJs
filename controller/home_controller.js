const User = require('../models/user');

module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('check',20);
    res.render("home",{title:'home'});
}
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render("profile",{
                    'title':'my profile',
                    'user':user
                })
            }else{
                return res.redirect('/signin');
            }

        })
    }else{
        return res.redirect('/signin');
    }
    
}
module.exports.signin = function(req,res){
    res.render("signin",{title:'signin'});
}
module.exports.signup = function(req,res){
    res.render("signup",{title:'signup'});
}
module.exports.create = function(req,res){
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
module.exports.login = function(req,res){
    // fetch login details
    const login = req.body;
    // find user
    User.findOne({email:login.email},function(err,user){
        if(err){
            console.log(err);
            return
        }
        // handle user
        if(user){
            if(login.password===user.password){

                res.cookie('user_id',user.id);
            return res.redirect('/profile');
            }
            else{
                console.log("password not match");
                res.redirect('/');
            }
        }
        else{
            return redirect("/");
        }
        
    })
        // handle not user

}

