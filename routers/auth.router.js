const router = require('express').Router();

const {authController} = require('../controllers')

router.post('/', authController.loginUser);

module.exports = router;
