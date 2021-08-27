const { statusCodes } = require('../configs');
const { User } = require('../dataBase');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const createdUser = await User.create(req.body);

            res.status(statusCodes.CREATED).json(createdUser);
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

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userUpdate = await User.findByIdAndUpdate(userId, req.body);

            res.json(userUpdate);
        } catch (e) {
            next(e);
        }
    }

};
