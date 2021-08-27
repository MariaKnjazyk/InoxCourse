const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getCars);
router.post('/', carMiddleware.isFillInAllFields, carMiddleware.isYearReal, carController.createCar);
router.delete('/:carId', carMiddleware.isCarPresent, carController.deleteCar);
router.get('/:carId', carMiddleware.isCarPresent, carController.getCarById);
router.put('/:carId', carMiddleware.checkDataToModify,
    carMiddleware.isYearReal, carMiddleware.isCarPresent, carController.updateCar);

module.exports = router;
