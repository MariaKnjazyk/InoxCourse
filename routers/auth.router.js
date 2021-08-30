const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.validateDataToAuth, authMiddleware.isUserPresentByEmail, authMiddleware.checkPassword,
    authController.loginUser);

module.exports = router;
