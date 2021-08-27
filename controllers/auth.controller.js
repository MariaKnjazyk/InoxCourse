const { statusCodes } = require('../configs');
const { User } = require('../dataBase');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email, password });

            if (!user) {
                res.status(statusCodes.NOT_FOUND).redirect('/register');

                return;
            }

            res.redirect(`/users?mail=${user.email}`);
        } catch (e) {
            next(e);
        }
    }
};
