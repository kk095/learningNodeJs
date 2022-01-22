const queue = require('../config/kue');
const resetPasswordMailer = require('../mailer/passwordReset_mailer');


queue.process('resetEmails',function(job,done){
    resetPasswordMailer.resetPasswordMail(job.data);
    done();
})