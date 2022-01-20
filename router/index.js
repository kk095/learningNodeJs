const express = require('express');
const router = express.Router();
const controller = require('../controller/home_controller');
const User = require('../models/user');

const jwtPassport = require("../config/passport-jwt-strategy");
const googleStrategy = require("../config/passport-google-oauth2");

router.get('/',controller.home);

router.use('/user',require('./user'));
router.use('/post',require('./posts'));
router.use('/comments',require('./comments'));
router.get('/signup',controller.signup);
router.get('/signin',controller.signin);
router.use('/api',require("./api"));

module.exports = router;