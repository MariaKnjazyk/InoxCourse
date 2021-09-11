const {
    actionEnum,
    constants: { AUTHORIZATION, QUERY_ACTION_TOKEN },
    databaseTablesEnum: { USER },
    dbFiled: { _ID },
    emailActionsEnum,
    statusCodes,
    variables: { FRONTEND_URL_PASSWORD }
} = require('../configs');
const {
    emailService,
    jwtService,
    passwordService
} = require('../services');
const {
    ActToken,
    OAuth,
    User
} = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    accountActivation: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await ActToken.findOneAndDelete({ [USER]: loginUser[_ID], action: actionEnum.ACTIVATE_ACCOUNT });

            const userToReturn = userUtil.userNormalizator(loginUser);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { loginUser, body: { password, oldpassword } } = req;

            if (!oldpassword) {
                await ActToken.findOneAndDelete({ [USER]: loginUser[_ID], action: actionEnum.FORGOT_PASSWORD });
            }

            const hashedPassword = await passwordService.hash(password);

            const changedUser = await User.findByIdAndUpdate(loginUser[_ID], { password: hashedPassword });

            const userToReturn = userUtil.userNormalizator(changedUser);

            await OAuth.deleteMany({ [USER]: changedUser[_ID] });

            res.status(statusCodes.CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const userToReturn = userUtil.userNormalizator(user);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, [USER]: user[_ID] });

            res.json({ ...tokenPair, [USER]: userToReturn });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    logoutUserAllDevices: async (req, res, next) => {
        try {
            const { loginUser } = req;

            await OAuth.deleteMany({ [USER]: loginUser[_ID] });

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { loginUser } = req;
            const refresh_token = req.get(AUTHORIZATION);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.findOneAndUpdate({ refresh_token }, tokenPair);

            res.status(statusCodes.CREATED).json({ ...tokenPair, [USER]: userUtil.userNormalizator(loginUser) });
        } catch (e) {
            next(e);
        }
    },

    sendMailChangePassword: async (req, res, next) => {
        try {
            const { user } = req;

            const userToReturn = userUtil.userNormalizator(user);

            const action_token = await jwtService.generateActionToken(actionEnum.FORGOT_PASSWORD);

            await ActToken.create({ action_token, [USER]: userToReturn[_ID], action: actionEnum.FORGOT_PASSWORD });

            await emailService.sendMail(
                userToReturn.email,
                emailActionsEnum.FORGOT_PASSWORD,
                { userName: userToReturn.name, activeTokenURL: FRONTEND_URL_PASSWORD + QUERY_ACTION_TOKEN + action_token }
            );

            res.status(statusCodes.CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },
};
