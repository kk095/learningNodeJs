const express = require('express');
const router = express.Router();


const userController = require('../../../controller/api/v1/users_api');

router.post('/create',userController.createToken);




module.exports = router;