const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isFillInAllFields, userMiddleware.isValidEmail,
    userMiddleware.checkUniqueEmail, userController.createUser);
router.delete('/:userId', userMiddleware.isUserPresent, userController.deleteUser);
router.get('/:userId', userMiddleware.isUserPresent, userController.getUserById);
router.put('/:userId', userMiddleware.checkDataToModify, userMiddleware.isValidEmail,
    userMiddleware.checkUniqueEmail, userMiddleware.isUserPresent, userController.updateUser);

module.exports = router;
