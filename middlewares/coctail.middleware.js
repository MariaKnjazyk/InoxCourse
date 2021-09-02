const { Coctail, CoctailCreator } = require('../dataBase');
const { coctailValidator } = require('../validators');
const {
    constants: { NEED_ITEM },
    databaseTablesEnum: { COCTAIL, USER },
    dataIn: { BODY },
    errorMessage, statusCodes
} = require('../configs');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkUserAccess: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, creator } = req;

            if (loginUser._id.toString() === creator._id.toString()) return next();

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
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
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            if (coctail && !isCoctailNeed) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_NAME);
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
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
