const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.createPost = function(req,res){
    Post.create({
        content:req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("error in creating post",err);
            return;
        }
        return res.redirect("/");
    })
}

module.exports.deletePost = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log("error during delete post",err);
            return res.redirect("/");
        }
        if(post.user==req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function (err,) {
                return res.redirect("/");
            })
        }
        else{
            return res.redirect("/");
        }
    })
}