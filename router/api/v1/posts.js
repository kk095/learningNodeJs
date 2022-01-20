const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../../../controller/api/v1/posts_api');

router.get('/',postsController.index);
router.get('/remove/:id',passport.authenticate('jwt',{session:false}),postsController.deletePost);


module.exports = router;