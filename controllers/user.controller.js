const { passwordService } = require('../services');
const { statusCodes } = require('../configs');
const { User } = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({ ...req.body, password: hashedPassword });
            const userToReturn = userUtil.userNormalizator(createdUser);

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
