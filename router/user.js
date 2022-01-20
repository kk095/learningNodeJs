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






module.exports = router;