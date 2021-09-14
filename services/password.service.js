const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors');
const { constants: { SALT }, errors } = require('../configs');

module.exports = {
    compare: async (hash, password) => {
        const isPasswordMath = await bcrypt.compare(password, hash);

        if (!isPasswordMath) {
            throw new ErrorHandler(
                errors.NOT_FOUND.WRONG_PASSW_OR_EMAIL.status,
                errors.NOT_FOUND.WRONG_PASSW_OR_EMAIL.customCode,
                errors.NOT_FOUND.WRONG_PASSW_OR_EMAIL.message
            );
        }
    },

    hash: (password) => bcrypt.hash(password, SALT)
};
