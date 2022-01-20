const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Post = require('../models/posts');

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);

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
                }
                user.save();
                return res.redirect("back");
            })
        }


    } catch (err) {
        console.log(err);
    }
}