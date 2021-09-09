const {
    actionEnum,
    constants: { AUTHORIZATION, TOKEN_TYPE_ACCESS },
    databaseTablesEnum: { USER },
    errorMessage,
    statusCodes
} = require('../configs');
const { ErrorHandler } = require('../errors');
const { jwtService, passwordService } = require('../services');
const { ActToken, OAuth } = require('../dataBase');

module.exports = {
    isAccountActivated: async (req, res, next) => {
        try {
            const { user } = req;

            const inactiveAcc = await ActToken.findOne({ [USER]: user._id, action: actionEnum.ACTIVATE_ACCOUNT });

            if (inactiveAcc) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.ACCOUNT_IS_NOT_ACTIVATED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkOldPassword: async (req, res, next) => {
        try {
            const { loginUser, body: { oldPassword } } = req;

            await passwordService.compare(loginUser.password, oldPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: (action) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NO_TOKEN);
            }

            await jwtService.verifyActionToken(token, action);

            const tokenFromDB = await ActToken.findOne({ action_token: token, action });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NOT_VALID_TOKEN);
            }

            req.loginUser = tokenFromDB[USER];

            next();
        } catch (e) {
            next(e);
        }
    },

    validateToken: (tokenType = TOKEN_TYPE_ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NO_TOKEN);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenFromDB = await OAuth.findOne({ [tokenType]: token });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NOT_VALID_TOKEN);
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
