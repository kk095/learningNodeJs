const express = require('express');
const router = express.Router();
const controller = require('../controller/home_controller');

router.get('/',controller.home);

router.use('/user',require('./user'));
router.get('/signup',controller.signup);
router.get('/signin',controller.signin);


module.exports = router;