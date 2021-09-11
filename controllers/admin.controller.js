const {
    statusCodes,
} = require('../configs');
const { superAdminUtil } = require('../utils');
const { s3Service } = require('../services');
const { User } = require('../dataBase');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { body: { name, email, role }, loginUser } = req;

            let createdUser = await superAdminUtil.createByAdmin(name, email, role, loginUser.name);

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', createdUser._id);
                createdUser = await User.findByIdAndUpdate(
                    createdUser._id,
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            res.status(statusCodes.CREATED).json('ok');
        } catch (e) {
            next(e);
        }
    },
};
