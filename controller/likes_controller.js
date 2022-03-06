const User = require('../models/user');
const Post = require('../models/posts');
const Comments = require('../models/comment');
const Like = require('../models/like');

module.exports.toggleLike = async function(req,res){
   try{
        let likeObj;
        let exits = false;
        // get the post or comment which is liked by user
        if(req.query.type=="post"){
            likeObj = await Post.findById(req.query.id).populate("likes");
        }else{
            likeObj = await Comments.findById(req.query.id).populate("likes");
        }
        
        // check whether this like exits or not
        let likeExits = await Like.findOne({
            user : req.user._id,
            liked : req.query.id,
            onModel : req.query.type
        })

        // if like exits, delete like
        if(likeExits){
            exits = true;
            likeObj.likes.pull(likeExits._id);
            likeObj.save();

            likeExits.remove();
        }else{
            // if like not exits,create like
            let newLike = await Like.create({
                user : req.user._id,
                liked : req.query.id,
                onModel : req.query.type
            })

            likeObj.likes.push(newLike._id);
            likeObj.save();
        }
        
        if(req.xhr){
            return res.status(200).json({
                message : "request sucessful",
                data : {
                    exits : exits
                }
            })
        }


   }catch(err){
       console.log(err);
       return res.status(500).json({
           message : "Internal Server Error"
       })
   }
}