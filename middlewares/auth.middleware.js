const ErrorHandler = require('../errors/ErrorHandler');
const { errorMessage, statusCodes } = require('../configs');
const { passwordService } = require('../services');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            await passwordService.compare(user.password, password);

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_PASSW_OR_EMAIL);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataToAuth: (req, res, next) => {
        try {
            const { error } = userValidator.authUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
