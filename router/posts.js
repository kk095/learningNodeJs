const express = require('express');
const router = express.Router();
const postController = require('../controller/posts_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication ,postController.createPost);
router.get('/remove/:id',passport.checkAuthentication ,postController.deletePost);






module.exports = router;