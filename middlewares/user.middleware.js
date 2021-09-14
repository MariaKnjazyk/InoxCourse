const {
    constants: { NEED_ITEM, AUTH },
    dataIn: { BODY },
    errors,
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
                throw new ErrorHandler(
                    errors.FORBIDDEN.FORBIDDEN.status,
                    errors.FORBIDDEN.FORBIDDEN.customCode,
                    errors.FORBIDDEN.FORBIDDEN.message
                );
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
                throw new ErrorHandler(
                    errors.BAD_REQUEST.WRONG_ROLE.status,
                    errors.BAD_REQUEST.WRONG_ROLE.customCode,
                    errors.BAD_REQUEST.WRONG_ROLE.message
                );
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
                if (!auth) {
                    throw new ErrorHandler(
                        errors.NOT_FOUND.NOT_FOUND.status,
                        errors.NOT_FOUND.NOT_FOUND.customCode,
                        errors.NOT_FOUND.NOT_FOUND.message
                    );
                }

                throw new ErrorHandler(
                    errors.NOT_FOUND.WRONG_PASSW_OR_EMAIL.status,
                    errors.NOT_FOUND.WRONG_PASSW_OR_EMAIL.customCode,
                    errors.NOT_FOUND.WRONG_PASSW_OR_EMAIL.message
                );
            }

            if (user && !isUserNeed) {
                throw new ErrorHandler(
                    errors.CONFLICT.EXIST_EMAIL.status,
                    errors.CONFLICT.EXIST_EMAIL.customCode,
                    errors.CONFLICT.EXIST_EMAIL.message
                );
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
                throw new ErrorHandler(
                    errors.BAD_REQUEST.NOT_VALID_DATA.status,
                    errors.BAD_REQUEST.NOT_VALID_DATA.customCode,
                    error.details[0].message
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
