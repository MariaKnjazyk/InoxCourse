const {
    constants: { AUTHORIZATION, TOKEN_TYPE_ACCESS },
    databaseTablesEnum: { USER },
    errorMessage,
    statusCodes
} = require('../configs');
const { ErrorHandler } = require('../errors');
const { jwtService: { verifyToken } } = require('../services');
const { OAuth } = require('../dataBase');

module.exports = {
    validateToken: (tokenType = TOKEN_TYPE_ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NO_TOKEN);
            }

            await verifyToken(token, tokenType);

            const tokenFromDB = await OAuth.findOne({ [tokenType]: token }).populate(USER);

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
