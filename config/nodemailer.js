const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : "587",
    secure : false,
    auth:{
        user : "playourgame936@gmail.com",
        pass : "#Playourgame@936"
    }
})

let renderTemplate = (data,relativePath)=>{
    console.log("data in nodemailer : ",data);
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering mailer template",err);
                return;
            }
            mailHtml = template;
        }
    )
        return mailHtml;
}

module.exports = {
    renderTemplate : renderTemplate,
    transporter : transporter
}