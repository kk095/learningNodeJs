const express = require('express');
const router = express.Router();
const controller = require('../controller/user_controller');
const passport = require("passport");


router.get('/profile/:id', passport.checkAuthentication ,controller.profile);
router.post('/update/:id', passport.checkAuthentication ,controller.update);

router.post('/signin',passport.authenticate(
    'local',
    {failureRedirect:'/signin'},
),controller.create);

router.post('/signup',controller.createNewUser);

router.get('/signout',controller.destroyUserSession);
router.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}));
router.get('/auth/google/callback', passport.authenticate("google",{failureRedirect:"/user/signin"}),controller.create);
router.get('/forget_password',controller.forgetPassword);
router.post('/reset_password',controller.resetPassword);
router.get('/reset-password/:token',controller.resetPasswordUsingToken);
router.post('/new-password',controller.newpassword);
router.post('/friend/:id',controller.friendship);





module.exports = router;