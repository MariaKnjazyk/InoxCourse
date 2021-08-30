const ErrorHandler = require('../errors/ErrorHandler');
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

    isCoctailPresent: async (req, res, next) => {
        try {
            const { coctailId } = req.params;
            const coctail = await Coctail.findById(coctailId);

            if (!coctail) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.coctail = coctail;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToCreate: (req, res, next) => {
        try {
            const { error } = coctailValidator.createCoctail.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToUpdate: (req, res, next) => {
        try {
            const { error } = coctailValidator.updateOrFindCoctail.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToFind: (req, res, next) => {
        try {
            const { error } = coctailValidator.updateOrFindCoctail.validate(req.query);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCoctailId: (req, res, next) => {
        try {
            const { error } = coctailValidator.coctailId.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
