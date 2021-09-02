const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const {
    constants: { AUTH, NEED_ITEM, TOKEN_TYPE_REFRESH },
    destiny,
    paramName
} = require('../configs');

router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.AUTH),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(NEED_ITEM, AUTH),
    authController.loginUser
);

router.post(
    '/logout',
    authMiddleware.validateToken(),
    authController.logoutUser
);

router.post(
    '/logout_all_devices',
    authMiddleware.validateToken(),
    authController.logoutUserAllDevices
);

router.post(
    '/refresh',
    authMiddleware.validateToken(TOKEN_TYPE_REFRESH),
    authController.refresh
);

module.exports = router;
