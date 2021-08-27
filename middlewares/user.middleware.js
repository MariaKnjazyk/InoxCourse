const ErrorHandler = require('../errors/ErrorHandler');
const { errorMessage, statusCodes } = require('../configs');
const { User } = require('../dataBase');

module.exports = {
    checkDataToModify: (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            const normEmail = email ? email.toLowerCase().trim() : email;
            const normName = name ? name.trim() : name;
            const normPassword = password ? password.trim() : password;

            if ((!normEmail && !normName && !normPassword) || normEmail === '' || normName === '' || normPassword === '') {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.NO_DATA);
            }

            req.body.email = normEmail;
            req.body.name = normName;
            req.body.password = normPassword;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, errorMessage.EXIST_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isFillInAllFields: (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            const normEmail = email ? email.toLowerCase().trim() : email;
            const normName = name ? name.trim() : name;
            const normPassword = password ? password.trim() : password;

            if (!normEmail || !normName || !normPassword) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.FILL_FIELDS);
            }

            req.body.email = normEmail;
            req.body.name = normName;
            req.body.password = normPassword;

            next();
        } catch (e) {
            next(e);
        }
    },

    isFillInAuthFields: (req, res, next) => {
        try {
            const { email, password } = req.body;

            const normEmail = email ? email.toLowerCase().trim() : email;
            const normPassword = password ? password.trim() : password;

            if (!normEmail || !normPassword) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.FILL_FIELDS);
            }

            req.body.email = normEmail;
            req.body.password = normPassword;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, errorMessage.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidEmail: (req, res, next) => {
        try {
            const { email } = req.body;

            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!regex.test(email) && email) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.NOT_VALID_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
