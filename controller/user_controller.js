const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
const crypto = require('crypto');
const queue = require('../config/kue');
const passwordResetWorker = require('../worker/passwordReset_mailer');
const Friendship = require('../models/friendship');

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id).populate({
           path :  "friends",
           populate : {
               path : "to_user",
               select : 'name email'
            },
            
        }).populate({
            path : "friends",
            populate : {
                path : "from_user",
                select : 'name email'
            }
        })
        console.log(user);
        return res.render("profile", {
            'title': 'profile',
            'profile_user': user
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports.create = function (req, res) {
    req.flash("success", "you have login  successfully !...");
    return res.redirect('/');

}

module.exports.createNewUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            res.redirect('/');
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            User.create(req.body);
            req.flash("success", " welcome ! You have signup our website")
            res.redirect("/");
        }
        else {
            req.flash("error", "Oops ! this user already exits ")
            res.redirect("/");

        }

    } catch (err) {
        req.flash("error", err);
        res.redirect("/");

    }

}

module.exports.destroyUserSession = function (req, res) {
    req.logout();
    req.flash("success", "you have logged out successfully !...");
    res.redirect('/');
}



module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("****MULT_ERROR=:", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,"..",user.avatar))){
                               fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                               user.avatar = User.avatarPath + "/" + req.file.filename;
                        }
                        else{
                                user.avatar = User.avatarPath + "/" + req.file.filename;
                            }
                        }
                        else{
                        user.avatar = User.avatarPath + "/" + req.file.filename;
                    }
                }
                user.save();
                return res.redirect("back");
            })
        }


    } catch (err) {
        console.log(err);
    }
}

module.exports.forgetPassword = function(req,res){
   return res.render("forget_password",{title:"Forget Password",layout:false});
}

module.exports.resetPassword = async function (req,res){
    try{
    let user = await User.findOne({email : req.body.email});
        if(user){
           let token = await ResetPassword.findOne({user:user});
                if(token){
                    token.token = crypto.randomBytes(20).toString("hex");
                    token.isValid = true;
                    await token.save();
                    let requestedUser = await ResetPassword.findById(token._id).populate("user",["name","email"]);
                    let job = queue.create("resetEmails",requestedUser).save(function(err){
                        if(err){
                            console.log("error in reset controller ",err);
                        }
                    })
                }
                else{
                        let newtoken = await ResetPassword.create({
                        user : user._id,
                        token : crypto.randomBytes(20).toString("hex"),
                        isValid : true
                    });
                    let requestedUser = await ResetPassword.findById(newtoken._id).populate("user",["name","email"]);
                    let job = queue.create("resetEmails",requestedUser).save(function(err){
                    if(err){
                        console.log("error in reset controller ",err);
                    }
            })
                }
            
            req.flash("success","password reset link has been sent to your email");
            return res.redirect('/');
        }
        else{
            req.flash("error" , "Email didn't match with any User ");
            return res.redirect("/");
        }

    }catch(err){
        console.log("error in finding user during reset password",err);
            return;
    }
    
}

module.exports.resetPasswordUsingToken = function(req,res){
    ResetPassword.findOne({token:req.params.token},function(err,data){
        if(err){
            console.log(err);
            return;
        }
        return res.render("resetPasswordUsingToken",{layout:false,user:data});
    })
}
module.exports.newpassword = function(req,res){
    console.log(req.body);
    if(req.body.password == req.body.passwordAgain){
        User.findByIdAndUpdate(req.body.user,{
            password : req.body.password
        },function(err,data){
            if(err){
                console.log(err);
                return
            }
            ResetPassword.findOne({token:req.body.token},function(err,token){
                if(err){
                    console.log(err);
                    return
                }
                if(token){
                    token.isValid =false;
                    token.save();
                }
            })
            req.flash("success","your password has been reset")
            return res.redirect('/');
        })
    }
    else{
        req.flash("error","your confirm password is not matching ");
        return res.redirect("/");
    }
}

module.exports.friendship = async function(req,res){
        try{
            let friend = await User.findById(req.params.id);
            let newfriend;
            let relation1 = await Friendship.findOne({
                to_user : req.user._id,
                from_user : friend._id
            });
            let relation2 = await Friendship.findOne({
                to_user : friend._id,
                from_user :req.user._id
            });
            if(relation1|| relation2){
                    console.log("frienship is already present");
            }
            else{
                    newfriend = await Friendship.create({
                        "from_user" : req.user._id,
                        "to_user" : friend._id,
                    });
                    let currentUser = await User.findById(req.user.id);
                    friend.friends.push(newfriend);
                    currentUser.friends.push(newfriend);
                    friend.save();
                    currentUser.save();
                    console.log(newfriend);
            }
            if(req.xhr){
                    return res.status(200).json({
                        "message" : "successful",
                        data : newfriend
                    });
            }
                return res.redirect("/");
        }catch(err){
            console.log(err);
            return;
        }

}