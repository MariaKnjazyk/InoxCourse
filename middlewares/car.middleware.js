const { Car } = require('../dataBase');
const { carYears, errorMessage, statusCodes } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkDataToModify: (req, res, next) => {
        try {
            const { model, year } = req.body;

            const normModel = model ? model.trim() : model;
            const normYear = +year;

            if ((!normModel && !normYear) || normModel === '') {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.NO_DATA);
            }

            req.body.model = normModel;
            req.body.year = normYear;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarPresent: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isFillInAllFields: (req, res, next) => {
        try {
            const { model, year } = req.body;

            const normModel = model ? model.trim() : model;
            const normYear = +year;

            if (!normModel || !normYear) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.FILL_FIELDS);
            }

            req.body.model = normModel;
            req.body.year = normYear;

            next();
        } catch (e) {
            next(e);
        }
    },

    isYearReal: (req, res, next) => {
        try {
            const { year } = req.body;

            if (year < carYears.START_YEAR || year > carYears.CURRENT_YEAR) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_YEAR);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
