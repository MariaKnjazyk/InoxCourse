const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const {
    constants: { AUTH, NEED_ITEM },
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

module.exports = router;
