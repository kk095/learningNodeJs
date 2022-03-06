const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    chatroom : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const Chats = mongoose.model("Chats",chatsSchema);

module.exports = Chats;