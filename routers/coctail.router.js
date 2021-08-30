const router = require('express').Router();

const { coctailController } = require('../controllers');
const { coctailMiddleware } = require('../middlewares');

router.get('/', coctailMiddleware.validateDataToFind, coctailController.getCoctail);
router.post('/', coctailMiddleware.validateDataToCreate, coctailMiddleware.checkUniqueName, coctailController.createCoctail);

router.delete('/:coctailId', coctailMiddleware.validateCoctailId, coctailMiddleware.isCoctailPresent,
    coctailController.deleteCoctail);
router.get('/:coctailId', coctailMiddleware.validateCoctailId, coctailMiddleware.isCoctailPresent,
    coctailController.getCoctailById);
router.put('/:coctailId', coctailMiddleware.validateCoctailId, coctailMiddleware.validateDataToUpdate,
    coctailMiddleware.checkUniqueName, coctailMiddleware.isCoctailPresent, coctailController.updateCoctail);

module.exports = router;
