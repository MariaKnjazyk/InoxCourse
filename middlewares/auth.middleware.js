const { ErrorHandler } = require('../errors');
const { errorMessage, statusCodes } = require('../configs');
const { passwordService } = require('../services');
const { User } = require('../dataBase');

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

    isUserPresentByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[searchIn][paramName];

            if (paramName === 'email') data = data.toLowerCase();

            const user = await User.findOne({ [dbFiled]: data });

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_PASSW_OR_EMAIL);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
