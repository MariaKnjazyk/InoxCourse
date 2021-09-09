const jwt = require('jsonwebtoken');

const {
    actionEnum,
    constants: { TOKEN_TYPE_ACCESS },
    errorMessage,
    statusCodes,
    variables: {
        ACCESS_SECRET_KEY,
        ACTIVATE_ACCOUNT_SECRET_KEY,
        REFRESH_SECRET_KEY,
        FORGOT_PASSWORD_SECRET_KEY
    }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            const secret = tokenType === TOKEN_TYPE_ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NOT_VALID_TOKEN);
        }
    },

    generateActionToken: (actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);

        return jwt.sign({}, secretWord, { expiresIn: '7d' });
    },

    verifyActionToken: async (token, actionType) => {
        const secretWord = _getSecretWordForActionToken(actionType);
        try {
            await jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodes.NOT_VALID_TOKEN, errorMessage.NOT_VALID_TOKEN);
        }
    }
};

function _getSecretWordForActionToken(actionType) {
    let secretWord = '';

    switch (actionType) {
        case actionEnum.FORGOT_PASSWORD:
            secretWord = FORGOT_PASSWORD_SECRET_KEY;
            break;
        case actionEnum.ACTIVATE_ACCOUNT:
            secretWord = ACTIVATE_ACCOUNT_SECRET_KEY;
            break;
        default:
            throw new ErrorHandler(statusCodes.INTERNAL_SERVER_ERROR, errorMessage.WRONG_TOKEN_TYPE);
    }

    return secretWord;
}
