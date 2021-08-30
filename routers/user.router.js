const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userMiddleware.validateDataToFind, userController.getUsers);
router.post('/', userMiddleware.validateDataToCreate, userMiddleware.checkUniqueEmail, userController.createUser);

router.delete('/:userId', userMiddleware.validateUserId, userMiddleware.isUserPresent, userController.deleteUser);
router.get('/:userId', userMiddleware.validateUserId, userMiddleware.isUserPresent, userController.getUserById);
router.put('/:userId', userMiddleware.validateUserId, userMiddleware.validateDataToUpdate,
    userMiddleware.checkUniqueEmail, userMiddleware.isUserPresent, userController.updateUser);

module.exports = router;
