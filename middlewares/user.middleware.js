const {
    constants: { NEED_ITEM, AUTH },
    dataIn: { BODY },
    errorMessage,
    statusCodes,
    userRolesEnum: { USER }
} = require('../configs');
const { ErrorHandler } = require('../errors');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUserAccess: (rolesArr = []) => (req, res, next) => {
        try {
            const { loginUser, user } = req;

            if (user) {
                if (loginUser._id.toString() === user._id.toString()) return next();
            }

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(loginUser.role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, errorMessage.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoleForCreate: (rolesArr = []) => (req, res, next) => {
        try {
            let { role } = req.body;

            if (!role) role = USER;

            if (!rolesArr.length) return next();

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_ROLE);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, dataIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            let data = req[dataIn][paramName];

            if (!data) return next();

            if (paramName === 'email') data = data.toLowerCase();

            const user = await User.findOne({ [dbFiled]: data });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (isUserNeed = NEED_ITEM, auth = !AUTH) => (req, res, next) => {
        try {
            const { user } = req;

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
