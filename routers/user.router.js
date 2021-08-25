const router = require('express').Router();

const {userController} = require('../controllers');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userIndex', userController.getSingleUser);

module.exports = router;
