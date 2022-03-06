const express = require('express');
const router = express.Router();
const chats_controller = require('../controller/chats_controller');
router.post('/create',chats_controller.saveChats);





module.exports = router;