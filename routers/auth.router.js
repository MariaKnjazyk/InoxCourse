const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post('/', userMiddleware.isFillInAuthFields, userMiddleware.isValidEmail, authController.loginUser);

module.exports = router;
