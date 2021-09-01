const { passwordService } = require('../services');
const { userUtil } = require('../utils');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(user.password, password);

            const userToReturn = userUtil.userNormalizator(user);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    }
};
