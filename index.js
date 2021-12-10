const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
app.use(expressLayouts);
const port = 8000;

const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/",require('./router'));


app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return
    }
    console.log("server is running on port :",port);
});