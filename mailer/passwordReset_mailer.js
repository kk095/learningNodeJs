const nodemailer = require('../config/nodemailer');


exports.resetPasswordMail = function(data){
    let resetHtml = nodemailer.renderTemplate({data : data},'/passwordReset.ejs');
    nodemailer.transporter.sendMail({
        from: 'playourgame936@gmail.com', 
        to: data.user.email, 
        subject: "password reset", 
        html: resetHtml,
    },function(err,info){
        if(err){
            console.log("error in reset password mail ",err);
            return;
        }
    })
}