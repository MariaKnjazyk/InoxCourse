const {
    statusCodes,
} = require('../configs');
const { superAdminUtil } = require('../utils');
const { s3Service } = require('../services');
const { User } = require('../dataBase');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { loginUser } = req;

            const createdUser = await superAdminUtil.createByAdmin(req.body, loginUser.name);

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, 'users', createdUser._id);
                await User.findByIdAndUpdate(
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
