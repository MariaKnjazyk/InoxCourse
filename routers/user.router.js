const router = require('express').Router();

const {
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
    userMiddleware.checkUniqueEmail,
    userController.createUser
);

router.use(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.ID, dataIn.PARAMS)
);
router.delete(
    '/:userId',
    userMiddleware.isUserPresentByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userController.deleteUser
);
router.get(
    '/:userId',
    userMiddleware.isUserPresentByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND),
    userMiddleware.checkUniqueEmail,
    userMiddleware.isUserPresentByDynamicParam(paramName.user.ID, dataIn.PARAMS, dbFiled._ID),
    userController.updateUser
);

module.exports = router;
