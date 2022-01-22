const Comments = require('../models/comment');
const Post = require('../models/posts');
const commentMail = require('../mailer/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../worker/comment_mailer_worker');

module.exports.createComment = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        let comment = await Comments.create({
             content:req.body.content,
             user:req.user._id,
             post:req.body.post
         });
        post.comments.push(comment);
        post.save();
        const newComment = await Comments.findById(comment._id).populate("user",["name","avatar","email"]);
        //  commentMail.commentMail(newComment);
        let job = queue.create("emails",newComment).save(function(err){
            if(err){
                console.log("error in assinging job",err);
                return;
            }
            console.log("job id is ", job.id);
        })
         if(req.xhr){
             return res.status(200).json({
                 data:newComment,
                 message:{"success":"comment created!"}
             })
         }else{
             req.flash("success","your comment has posted !")
             res.redirect('/');
         }

    }catch(err){
        req.flash("error",err);
        console.log(err);
        res.redirect("/");
    }
    
}

module.exports.deleteComment = async function(req,res){
    try{
        let comment = await Comments.findById(req.params.id);
        await Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.id}});
        if(req.xhr){
            return res.status(200).json({
                data:comment,
                message:{ "success":"comment deleted !"}
            })
        }
        req.flash("success","comment has delete");
        return res.redirect("/");

    }catch(err){
        req.flash("error",err);
        res.redirect("/");
    }
    
}