const express = require('express');
const router = express.Router();
const likeController = require('../controller/likes_controller');

router.post('/toggle',likeController.toggleLike);


module.exports = router;