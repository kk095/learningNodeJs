const express = require('express');
const env = require('./environment');
const mongoose = require('mongoose');

main().then(()=>{
    console.log("mongoose is working");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
}