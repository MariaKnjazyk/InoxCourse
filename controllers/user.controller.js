const {
    emailService,
    jwtService,
    s3Service,
    userService
} = require('../services');
const {
    actionEnum,
    constants: { QUERY_ACTION_TOKEN },
    emailActionsEnum,
    statusCodes,
    variables: { FRONTEND_URL }
} = require('../configs');
const { ActToken, User } = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            let createdUser = await User.createWithHashPassword(req.body);

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', createdUser._id);
                createdUser = await User.findByIdAndUpdate(
                    createdUser._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const userToReturn = userUtil.userNormalizator(createdUser);

            const action_token = await jwtService.generateActionToken(actionEnum.ACTIVATE_ACCOUNT);

            await ActToken.create({ action_token, user: userToReturn._id, action: actionEnum.ACTIVATE_ACCOUNT });

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
            const { params: { userId }, user } = req;

            await User.deleteOne({ _id: userId });

            if (user.avatar) {
                await s3Service.deleteFile(user.avatar);
            }

            res.sendStatus(statusCodes.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const response = await userService.getAll(req.query);

            res.json(response);
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
            let { user } = req;

            if (req.files && req.files.avatar) {
                if (user.avatar) {
                    await s3Service.deleteFile(user.avatar);
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', user._id);
                user = await User.findByIdAndUpdate(
                    user._id,
                    { ...req.body, avatar: s3Response.Location },
                    { new: true }
                );
            } else {
                user = await User.findByIdAndUpdate(user._id, req.body);
            }

            const userToReturn = userUtil.userNormalizator(user);

            res.status(statusCodes.CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    }

};
