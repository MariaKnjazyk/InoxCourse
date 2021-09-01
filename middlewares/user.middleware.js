const {
    constants: { NEED_ITEM, AUTH },
    dataIn: { BODY },
    errorMessage,
    statusCodes
} = require('../configs');
const { ErrorHandler } = require('../errors');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    getUserByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            console.log('data');
            let data = req[dataIn][paramName];
            console.log(data);

            if (!data) return next();

            if (paramName === 'email') data = data.toLowerCase();

            const user = await User.findOne({ [dbFiled]: data });

            req.user = user;
            console.log(user);

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (isUserNeed = NEED_ITEM, auth = !AUTH) => (req, res, next) => {
        try {
            console.log('user');
            const { user } = req;
            console.log(user);
            if (!user && isUserNeed) {
                if (!auth) throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);

                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.WRONG_PASSW_OR_EMAIL);
            }

            if (user && !isUserNeed) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

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
