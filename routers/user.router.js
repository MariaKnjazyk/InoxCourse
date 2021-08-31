const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get(
    '/',
    userMiddleware.validateDataDynamic('updateOrFindUser', 'query'),
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.validateDataDynamic('createUser'),
    userMiddleware.checkUniqueEmail,
    userController.createUser
);

router.use(
    '/:userId',
    userMiddleware.validateDataDynamic('userId', 'params')
);
router.delete(
    '/:userId',
    userMiddleware.isUserPresentByDynamicParam('userId', 'params', '_id'),
    userController.deleteUser
);
router.get(
    '/:userId',
    userMiddleware.isUserPresentByDynamicParam('userId', 'params', '_id'),
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.validateDataDynamic('updateOrFindUser'),
    userMiddleware.checkUniqueEmail,
    userMiddleware.isUserPresentByDynamicParam('userId', 'params', '_id'),
    userController.updateUser
);

module.exports = router;
