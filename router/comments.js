const express = require('express');
const router = express.Router();
const passport = require('passport');
const comments = require('../controller/comments_controller');

router.post('/create',passport.checkAuthentication,comments.createComment);



module.exports = router;