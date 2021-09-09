const router = require('express').Router();

const {
    constants: { NEED_ITEM, NO_ONE },
    dataIn,
    dbFiled,
    destiny,
    paramName,
    userRolesEnum: { ADMIN, SUPER_ADMIN, USER }
} = require('../configs');
const { userController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.get(
    '/',
    userMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND, dataIn.QUERY),
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.CREATE),
    userMiddleware.checkUserRoleForCreate([USER]),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    userController.createUser
);

router.use(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.ID, dataIn.PARAMS)
);
router.delete(
    '/:userId',
    authMiddleware.validateToken(),
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userMiddleware.checkUserAccess([
        ADMIN,
        SUPER_ADMIN
    ]),
    userController.deleteUser
);
router.get(
    '/:userId',
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND),
    authMiddleware.validateToken(),
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userMiddleware.checkUserAccess([NO_ONE]),
    userController.updateUser
);

module.exports = router;
