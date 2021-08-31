const router = require('express').Router();

const { coctailController } = require('../controllers');
const { coctailMiddleware } = require('../middlewares');

router.get(
    '/',
    coctailMiddleware.validateDataDynamic('updateOrFindCoctail', 'query'),
    coctailController.getCoctail
);
router.post(
    '/',
    coctailMiddleware.validateDataDynamic('createCoctail'),
    coctailMiddleware.checkUniqueName,
    coctailController.createCoctail
);

router.use(
    '/:coctailId',
    coctailMiddleware.validateDataDynamic('coctailId', 'params')
);
router.delete(
    '/:coctailId',
    coctailMiddleware.isCoctailPresentByDynamicParam('coctailId', 'params', '_id'),
    coctailController.deleteCoctail
);
router.get(
    '/:coctailId',
    coctailMiddleware.isCoctailPresentByDynamicParam('coctailId', 'params', '_id'),
    coctailController.getCoctailById
);
router.put(
    '/:coctailId',
    coctailMiddleware.validateDataDynamic('updateOrFindCoctail'),
    coctailMiddleware.checkUniqueName,
    coctailMiddleware.isCoctailPresentByDynamicParam('coctailId', 'params', '_id'),
    coctailController.updateCoctail
);

module.exports = router;
