const router = require('express').Router();

const { coctailController } = require('../controllers');
const { authMiddleware, coctailMiddleware } = require('../middlewares');
const {
    constants: { NEED_ITEM, NO_ONE },
    dataIn,
    dbFiled,
    destiny,
    paramName,
    userRolesEnum: { ADMIN }
} = require('../configs');

router.get(
    '/',
    coctailMiddleware.validateDataDynamic(destiny.FIND, dataIn.QUERY),
    coctailController.getCoctail
);
router.post(
    '/',
    coctailMiddleware.validateDataDynamic(destiny.CREATE),
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.NAME),
    coctailMiddleware.isCoctailPresent(!NEED_ITEM),
    authMiddleware.validateToken(),
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
    authMiddleware.validateToken(),
    coctailMiddleware.getCoctailCreator,
    coctailMiddleware.checkUserAccess([ADMIN]),
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
    coctailMiddleware.validateDataDynamic(destiny.UPDATE),
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.NAME),
    coctailMiddleware.isCoctailPresent(!NEED_ITEM),
    coctailMiddleware.getCoctailByDynamicParam(paramName.coctail.ID, dataIn.PARAMS, dbFiled._ID),
    coctailMiddleware.isCoctailPresent(),
    authMiddleware.validateToken(),
    coctailMiddleware.getCoctailCreator,
    coctailMiddleware.checkUserAccess([NO_ONE]),
    coctailController.updateCoctail
);

module.exports = router;
