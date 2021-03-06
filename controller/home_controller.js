const User = require('../models/user');
const Post = require('../models/posts');
const comments = require('../models/comment');
const { findById } = require('../models/user');
const fs = require('fs');
const path = require('path');
const Chats = require('../models/chats');

module.exports.home = async function (req, res) {

    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            });
        let users = await User.find({});
        let chats = await Chats.find({}).populate("user","email");
        return res.render("home", { title: 'home', posts: posts, 'users': users,"chats":chats })

    } catch (err) {
        console.log("error ", err);
    }
}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    res.render("signin", { title: 'signin' });
}
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    res.render("signup", { title: 'signup' });
}