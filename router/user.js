const express = require('express');
const router = express.Router();
const controller = require('../controller/home_controller');
const passport = require("passport");


router.get('/profile', passport.checkAuthentication ,controller.profile);

router.post('/signin',passport.authenticate(
    'local',
    {failureRedirect:'/signin'},
),controller.create);

router.post('/signup',controller.create);

module.exports = router;