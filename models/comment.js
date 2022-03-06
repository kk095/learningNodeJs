const mongoose = require('mongoose');
const User = require('./user');

const commentsSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]

},{
    timestamps:true
})

const Comments = mongoose.model('Comments',commentsSchema);

module.exports=Comments;
