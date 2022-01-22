const queue = require('../config/kue');
const commentMailer = require('../mailer/comment_mailer');


queue.process('emails',function(job,done){
    console.log("inside emails workers ",job.data);
    commentMailer.commentMail(job.data);
    done();
})


