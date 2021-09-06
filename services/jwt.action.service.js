const jwt = require('jsonwebtoken');

const {
    errorMessage,
    statusCodes,
    variables: { ACTION_SECRET_KEY }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    generateActionToken: () => jwt.sign({}, ACTION_SECRET_KEY, { expiresIn: '30m' }),

    verifyActionToken: async (token) => {
        try {
            await jwt.verify(token, ACTION_SECRET_KEY);
        } catch (e) {
            throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NOT_VALID_TOKEN);
        }
    }
};
