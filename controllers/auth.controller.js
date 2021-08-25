const {
    filledFields,
    normalizationData,
    validateMail
} = require("../helpers/data.helper");
const { getUsersFromFile } = require('../services/user.service');
const { PATH_USERS } = require('../configs/variables');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { mail, password } = req.body;

            const isFilledFields = filledFields(mail, password);

            if (!isFilledFields) {
                res.status(400).redirect('/error?info=not_all_fields_are_filled');
                return;
            }

            const {normMail, normPass} = normalizationData(mail, password);

            const isValidMail = validateMail(normMail);

            if (!isValidMail) {
                res.status(400).redirect('/error?info=not_a_valid_mail');
                return;
            }

            const users = await getUsersFromFile(PATH_USERS);
            const logUser = users.find((user) => user.mail === normMail && user.password === normPass);

            if (logUser) {
                res.redirect(`/users?mail=${logUser.mail}`);

                return;
            }

            res.status(404).redirect('/register?info=user_not_found');
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}