const nodemailer = require('../config/nodemailer');


exports.commentMail = (comment)=>{ 
    let commentHtml =  nodemailer.renderTemplate({comment : comment},'/commentHtml.ejs');
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
      return;
  })};