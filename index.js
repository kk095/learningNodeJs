const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const passport = require('passport');
const localPassport = require('./config/passport-local-strategy');
const session = require('express-session');

app.use(expressLayouts);
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    name:'codial',
    secret:'somethingunique',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    }
}))
app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

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