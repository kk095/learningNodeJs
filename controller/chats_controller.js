const Chats = require('../models/chats');
const User = require("../models/user");
module.exports.saveChats = async function(req,res){
    try{
        let user = await User.findOne({email:req.query.useremail});
        let chats;
        if(user){
                chats = await Chats.create({
                    message : req.query.msg,
                    user :user,
                    chatroom : req.query.chatroom
                });
                console.log("new chats is ",chats);
            }
            
        if(req.xhr){
            return res.status(200).json({
                message : "success",
                chats : chats
            })
        }
        return res.redirect('/');
        }catch(err){
            console.log(err);
            return res.redirect('/');
        }
    
}