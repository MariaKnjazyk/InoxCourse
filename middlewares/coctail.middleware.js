const { ErrorHandler } = require('../errors');
const { Coctail } = require('../dataBase');
const { errorMessage, statusCodes } = require('../configs');
const { coctailValidator } = require('../validators');

module.exports = {
    checkUniqueName: async (req, res, next) => {
        try {
            let { name } = req.body;

            if (name) name = name.toLowerCase();

            const coctailByEmail = await Coctail.findOne({ name });

            if (coctailByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_NAME);
            }

            req.body.name = name;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCoctailPresentByDynamicParam: (paramName, dataIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (paramName === 'name') data = data.toLowerCase();

            const coctail = await Coctail.findOne({ [dbFiled]: data });

            if (!coctail) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.coctail = coctail;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (destiny, dataIn = 'body') => (req, res, next) => {
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
