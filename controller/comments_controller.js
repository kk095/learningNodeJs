const Comments = require('../models/comment');
const Post = require('../models/posts');

module.exports.createComment=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comments.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,comment){
                // if(comment){
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                // }
            })
        }

        })
}

module.exports.deleteComment = function(req,res){
    Comments.findById(req.params.id,function(err,comment){
        if(err){
            console.log("error during delete comments ",err);
            return res.redirect("/");
        }
        Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.id}},function(err){
            return res.redirect("/");
        })
    })
}