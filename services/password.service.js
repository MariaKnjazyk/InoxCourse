const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { constants: { SALT }, errorMessage, statusCodes } = require('../configs');

module.exports = {
    compare: async (hash, password) => {
        const isPasswordMath = await bcrypt.compare(password, hash);

        if (!isPasswordMath) {
            throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_PASSW_OR_EMAIL);
        }
    },

    hash: (password) => bcrypt.hash(password, SALT)
};
