const nodemailer = require('../config/nodemailer');


exports.commentMail = (comment)=>{ 
    console.log("checking current data :",comment);
    let commentHtml =  nodemailer.renderTemplate({comment : comment},'/commentHtml.ejs');
    console.log("inside comment mailer");
    nodemailer.transporter.sendMail({
    from: 'playourgame936@gmail.com', 
    to: comment.user.email, // list of receivers
    subject: "comment published", // Subject line
    html: commentHtml,
  },(err,info)=>{
      if(err){
          console.log("error in sending mail",err);
          return;
      }
    //   console.log(info);
      return;
  })};