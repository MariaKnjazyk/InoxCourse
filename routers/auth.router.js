const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post(
    '/',
    userMiddleware.validateDataDynamic('authUser'),
    authMiddleware.isUserPresentByDynamicParam('email'),
    authMiddleware.checkPassword,
    authController.loginUser
);

module.exports = router;
