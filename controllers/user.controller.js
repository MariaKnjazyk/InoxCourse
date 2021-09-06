const { emailService, jwtActionService, passwordService } = require('../services');
const {
    constants: { QUERY_ACTION_TOKEN },
    emailActionsEnum,
    statusCodes,
    variables: { FRONTEND_URL }
} = require('../configs');
const { InactiveAccount, User } = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({ ...req.body, password: hashedPassword });
            const userToReturn = userUtil.userNormalizator(createdUser);

            const action_token = await jwtActionService.generateActionToken();

            await InactiveAccount.create({ action_token, user: userToReturn._id });

            await emailService.sendMail(
                userToReturn.email,
                emailActionsEnum.WELCOME,
                { userName: userToReturn.name, activeTokenURL: FRONTEND_URL + QUERY_ACTION_TOKEN + action_token }
            );

            res.status(statusCodes.CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await User.deleteOne({ _id: userId });

            res.status(statusCodes.DELETED).json(`User with id ${userId} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find(req.query);

            const usersToReturn = users.map((user) => userUtil.userNormalizator(user));

            res.json(usersToReturn);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            const userToReturn = userUtil.userNormalizator(user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userUpdate = await User.findByIdAndUpdate(userId, req.body);

            const userToReturn = userUtil.userNormalizator(userUpdate);

            res.status(statusCodes.CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    }

};
