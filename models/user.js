const express = require('express');
const moongose = require('mongoose')
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
    }

},{
    timestamps:true
})

const User = moongose.model("user",user);

module.exports = User
