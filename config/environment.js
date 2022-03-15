const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,"../production_logs");
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log",{
    interval : '1d',
    path : logDirectory
})

const development = {
    name : "development",
    asset_path : './assets',
    session_secret :'somethingunique',
    db : 'social',
    smtp : {
        service : "gmail",
        host : "smtp.gmail.com",
        port : "587",
        secure : false,
        auth:{
            user : "playourgame936@gmail.com",
            pass : "#Playourgame@936"
        }
    },
    google_clientID : "32738030380-shk882gdipst6v9ih2ubdit6nfp9ev57.apps.googleusercontent.com",
    google_clientSecret : "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",
    google_callbackURL : "http://127.0.0.1:8000/user/auth/google/callback",
    passport_jwt_key : 'codial',
    morgan : {
        mode : 'dev',
        options : { stream : accessLogStream}
       
    }
}


const production = {
    name : 'production',
    asset_path : process.env.CODIAL_ASSET_PATH,
    session_secret : process.env.CODIAL_SESSION_SECRET ,
    db : process.env.CODIAL_DB ,
    smtp : {
        service : "gmail",
        host : "smtp.gmail.com",
        port : "587",
        secure : false,
        auth:{
            user :  process.env.CODIAL_SMTP_USER,
            pass : process.env.CODIAL_SMTP_PASSWORD
        }
    },
    google_clientID : process.env.CODIAL_GOOGLE_CLIENT_ID ,
    google_clientSecret :  process.env.CODIAL_GOOGLE_CLIENT_SECRET ,
    google_callbackURL :  process.env.CODIAL_GOOGLE_CALLBACK_URL ,
    passport_jwt_key :  process.env.CODIAL_JWT_KEY,
    morgan : {
        mode : 'combined',
        options : { stream : accessLogStream}
       
    }
   
}

console.log("my mame krishan hgchfygffy yf utrd jyuyy" );

// module.exports= eval(process.env.NODE_ENV)== undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);
module.exports = production;

