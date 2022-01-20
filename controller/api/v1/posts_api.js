const Post = require('../../../models/posts');
const Comment =  require('../../../models/comment');
module.exports.index = async function(req,res){
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        return res.status(200).json({
            message:"successfull!",
            posts:posts
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

module.exports.deletePost = async function(req,res){
    try{
        console.log("working....");
        let post = await Post.findById(req.params.id);
        console.log(post);
        console.log(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id});
                return res.status(200).json({
                    data:post,
                    message:{"success":"post delete!"}
                })
        }
        else{
            return res.status(401).json({
                message:"unautharized you cannot delete!",
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"internal servar error"
        })
    }
}