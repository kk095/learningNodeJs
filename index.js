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
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMiddleware =  require('./config/flash_messages');

app.use(expressLayouts);

// sass setting integration
app.use(sassMiddleware({
    src:path.join(__dirname,'./assets/scss'),
    dest:path.join(__dirname,'./assets/css'),
    debug:true,
    prefix:'/css',
    outputStyle:'expanded'
})) 

// middleware for ststic files
app.use('/upload',express.static(path.join(__dirname,"/upload")));
app.use(express.static(path.join( __dirname , './assets')));
app.use(express.urlencoded());
app.use(cookieParser());


app.use(session({
    name:'codial',
    secret:'somethingunique',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost:27017/social',
        mongooseConnection:db,
        autoRemove:'disabled'
        },
        function(err){
        console.log(err||'mongostore is connected');
        }
    )
}))
app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

// flash messages
app.use(flash());
app.use(flashMiddleware.flashMessage);


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