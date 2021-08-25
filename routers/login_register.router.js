const router = require('express').Router();

const { login_registerController } = require('../controllers');

router.get('/login', login_registerController.getLoginPage);
router.get('/register', login_registerController.getRegisterPage);

module.exports = router;
