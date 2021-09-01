const { dataIn: { BODY }, errorMessage, statusCodes } = require('../configs');
const { ErrorHandler } = require('../errors');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUniqueEmail: async (req, res, next) => {
        try {
            let { email } = req.body;

            if (email) email = email.toLowerCase();

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

            req.body.email = email;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (paramName === 'email') data = data.toLowerCase();

            const user = await User.findOne({ [dbFiled]: data });

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: (destiny, dataIn = BODY) => (req, res, next) => {
        try {
            const { error } = userValidator[destiny].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
