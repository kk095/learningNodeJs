const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.createPost = async function(req,res){
    try{
        let post= await Post.create({
            content:req.body.content,
            user: req.user._id
        });
        let newPost = await Post.findById(post._id).populate("user");
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:newPost
                },
                message:{"success":"Post created!"}
            })
        }
        
        
        return res.redirect("/");

    }catch(err){
        req.flash("error",err);
        console.log(err);
    }
    
}

module.exports.deletePost = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:post,
                    message:{"success":"post delete!"}
                })
            }
            req.flash("success","post and associated comments has deleted !");
        }
        else{
            req.flash("error","you can not delete this post");
            return res.redirect("/");
        }
    return res.redirect("/");
    }catch(err){
        req.flash("error",err);
        res.redirect("/");
    }
}