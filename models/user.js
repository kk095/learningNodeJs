const express = require('express');
const moongose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path .join("/upload/user/avatar");
const Schema =  moongose.Schema;

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }

},{
    timestamps:true
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

user.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
user.statics.avatarPath = AVATAR_PATH;

const User = moongose.model("user",user);

module.exports = User
