const express = require('express');
const router = express.Router();
const controller = require('../controller/home_controller');
const User = require('../models/user');

router.get('/',controller.home);

router.use('/user',require('./user'));
router.use('/post',require('./posts'));
router.use('/comments',require('./comments'));
router.get('/signup',controller.signup);
router.get('/signin',controller.signin);


module.exports = router;