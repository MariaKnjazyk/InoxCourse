const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');
const { adminController } = require('../controllers');
const {
    constants: { NEED_ITEM },
    destiny,
    paramName,
    userRolesEnum: { ADMIN, SUPER_ADMIN }
} = require('../configs');

router.use(
    '*',
    authMiddleware.validateToken(),
    userMiddleware.checkUserAccess(
        [
            ADMIN,
            SUPER_ADMIN
        ]
    )
);

router.post(
    '/create',
    userMiddleware.validateDataDynamic(destiny.CREATE_BY_ADMIN),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    adminController.createUser
);

module.exports = router;
