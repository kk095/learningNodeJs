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
