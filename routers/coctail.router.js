const router = require('express').Router();

const { coctailController } = require('../controllers');
const { coctailMiddleware } = require('../middlewares');
const {
    constants: { NEED_ITEM },
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
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.NAME),
    coctailMiddleware.isCoctailPresent(!NEED_ITEM),
    coctailController.createCoctail
);

router.use(
    '/:coctailId',
    coctailMiddleware.validateDataDynamic(destiny.ID, dataIn.PARAMS)
);
router.delete(
    '/:coctailId',
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailMiddleware.isCoctailPresent(),
    coctailController.deleteCoctail
);
router.get(
    '/:coctailId',
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailMiddleware.isCoctailPresent(),
    coctailController.getCoctailById
);
router.put(
    '/:coctailId',
    coctailMiddleware.validateDataDynamic(destiny.UPDATE_OR_FIND),
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.NAME),
    coctailMiddleware.isCoctailPresent(!NEED_ITEM),
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailMiddleware.isCoctailPresent(),
    coctailController.updateCoctail
);

module.exports = router;
