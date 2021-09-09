const {
    statusCodes,
} = require('../configs');
const { superAdminUtil } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { body: { name, email, role }, loginUser } = req;

            await superAdminUtil.createByAdmin(name, email, role, loginUser.name);

            res.status(statusCodes.CREATED).json('ok');
        } catch (e) {
            next(e);
        }
    },
};
