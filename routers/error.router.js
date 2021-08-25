const router = require('express').Router();

const { errorController } = require('../controllers');

router.get('/', errorController.showInfo);

module.exports = router;
