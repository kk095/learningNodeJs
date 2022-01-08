const express = require('express');
const mongoose = require('mongoose');
// const User =require('./user');

const postsSchema = new mongoose.Schema({
    content :{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comments'
        }
    ]
},
{
    timestamps:true
})

const Post = mongoose.model('post',postsSchema);
module.exports = Post;