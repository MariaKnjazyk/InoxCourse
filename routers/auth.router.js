const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const {
    destiny,
    paramName
} = require('../configs');

router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.AUTH),
    authMiddleware.isUserPresentByDynamicParam(paramName.user.EMAIL),
    authMiddleware.checkPassword,
    authController.loginUser
);

module.exports = router;
