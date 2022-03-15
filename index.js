const express = require('express');
const app = express();
const logger = require('morgan');
const env = require('./config/environment');
require('./config/helper')(app);
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


// setup chat socket
const cors = require('cors');
app.use(cors());
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chatSocket').chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port : 5000");
// app.use(logger(env.morgan.mode,{stream : env.morgan.options }))

app.use(expressLayouts);

// sass setting integration
if(process.env.CODIAL_ENVIRONMENT=='development'){
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
        prefix:'/css',
        outputStyle:'expanded'
    })) 
}

app.use(logger(env.morgan.mode,env.morgan.options));

// middleware for static files
app.use('/upload',express.static(path.join(__dirname,"/upload")));

console.log(env.asset_path);

app.use(express.static(env.asset_path));

app.use(express.urlencoded());
app.use(cookieParser());

//  setup express session
app.use(session({
    name:'codial',
    secret:env.session_secret,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*60*100)
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

// initialize passport
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