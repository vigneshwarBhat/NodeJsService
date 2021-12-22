const express = require('express');
const middleware = require('../middleware/auth');
const controller = require('../controller/user');

const router = express.Router();

router.post('/register', [
	middleware.checkUserNameAndEmailAvailable,
	middleware.isRoleValid,
	controller.Register,
]);

router.post('/login', controller.Login);

module.exports = router;
