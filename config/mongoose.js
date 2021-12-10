const express = require('express');

const mongoose = require('mongoose');

main().then(()=>{
    console.log("mongoose is working");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/social');
}