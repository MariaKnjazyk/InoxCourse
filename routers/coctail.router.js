const router = require('express').Router();

const { coctailController } = require('../controllers');
const { coctailMiddleware } = require('../middlewares');
const {
    dataIn,
    dbFiled,
    destiny,
    paramName
} = require('../configs');

router.get(
    '/',
    coctailMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND, dataIn.QUERY),
    coctailController.getCoctail
);
router.post(
    '/',
    coctailMiddleware.validateDataDynamic(destiny.CREATE),
    coctailMiddleware.checkUniqueName,
    coctailController.createCoctail
);

router.use(
    '/:coctailId',
    coctailMiddleware.validateDataDynamic(destiny.ID, dataIn.PARAMS)
);
router.delete(
    '/:coctailId',
    coctailMiddleware.isCoctailPresentByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailController.deleteCoctail
);
router.get(
    '/:coctailId',
    coctailMiddleware.isCoctailPresentByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailController.getCoctailById
);
router.put(
    '/:coctailId',
    coctailMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND),
    coctailMiddleware.checkUniqueName,
    coctailMiddleware.isCoctailPresentByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailController.updateCoctail
);

module.exports = router;
