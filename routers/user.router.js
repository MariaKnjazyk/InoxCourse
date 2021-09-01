const router = require('express').Router();

const {
    constants: { NEED_ITEM },
    dataIn,
    dbFiled,
    destiny,
    paramName
} = require('../configs');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get(
    '/',
    userMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND, dataIn.QUERY),
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.validateDataDynamic(destiny.CREATE),
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
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
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
    userMiddleware.getUserByDynamicParam(paramName.user.EMAIL),
    userMiddleware.isUserPresent(!NEED_ITEM),
    userMiddleware.getUserByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userMiddleware.isUserPresent(),
    userController.updateUser
);

module.exports = router;
