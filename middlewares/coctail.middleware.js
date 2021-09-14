const { Coctail, CoctailCreator } = require('../dataBase');
const { coctailValidator } = require('../validators');
const {
    constants: { NEED_ITEM },
    databaseTablesEnum: { COCTAIL, USER },
    dataIn: { BODY },
    errors,
} = require('../configs');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkUserAccess: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, creator } = req;

            if (loginUser._id.toString() === creator._id.toString()) return next();

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(
                    errors.FORBIDDEN.FORBIDDEN.status,
                    errors.FORBIDDEN.FORBIDDEN.customCode,
                    errors.FORBIDDEN.FORBIDDEN.message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCoctailPresent: (isCoctailNeed = NEED_ITEM) => (req, res, next) => {
        try {
            const { coctail } = req;

            if (!coctail && isCoctailNeed) {
                throw new ErrorHandler(
                    errors.NOT_FOUND.NOT_FOUND.status,
                    errors.NOT_FOUND.NOT_FOUND.customCode,
                    errors.NOT_FOUND.NOT_FOUND.message
                );
            }

            if (coctail && !isCoctailNeed) {
                throw new ErrorHandler(
                    errors.CONFLICT.EXIST_NAME.status,
                    errors.CONFLICT.EXIST_NAME.customCode,
                    errors.CONFLICT.EXIST_NAME.message
                );
            }

            req.coctail = coctail;

            next();
        } catch (e) {
            next(e);
        }
    },

    getCoctailByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (!data) return next();

            if (paramName === 'name') data = data.toLowerCase();

            const coctail = await Coctail.findOne({ [dbFiled]: data });

            req.coctail = coctail;

            next();
        } catch (e) {
            next(e);
        }
    },

    getCoctailCreator: async (req, res, next) => {
        try {
            const { coctailId } = req.params;

            const coctailCreator = await CoctailCreator.findOne({ [COCTAIL]: coctailId }).populate(USER);

            req.creator = coctailCreator[USER];

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (destiny, dataIn = BODY) => (req, res, next) => {
        try {
            const { error } = coctailValidator[destiny].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(
                    errors.BAD_REQUEST.NOT_VALID_DATA.status,
                    errors.BAD_REQUEST.NOT_VALID_DATA.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
