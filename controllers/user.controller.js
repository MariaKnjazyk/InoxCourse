const {
    filledFields,
    normalizationData,
    validateMail
} = require('../helpers/data.helper');
const {
    getUsersFromFile,
    writeUsersInFile
} = require('../services/user.service');
const { PATH_USERS } = require('../configs/variables');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { mail, password } = req.body;

            const isFilledFields = filledFields(mail, password);

            if (!isFilledFields) {
                res.status(400).redirect('/error?info=not_all_fields_are_filled');
                return;
            }

            const { normMail, normPass } = normalizationData(mail, password);
            const newUser = { mail: normMail, password: normPass };

            const isValidMail = validateMail(newUser.mail);

            if (!isValidMail) {
                res.status(400).redirect('/error?info=not_a_valid_mail');
                return;
            }

            const users = await getUsersFromFile(PATH_USERS);

            const isReg = users.some((user) => user.mail === newUser.mail);

            if (isReg) {
                res.status(400).redirect('/error?info=user_with_this_mail_already_exists');

                return;
            }

            users.push(newUser);
            await writeUsersInFile(PATH_USERS, users);

            res.status(201).redirect('/login');
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const { mail } = req.query;

            const users = await getUsersFromFile(PATH_USERS);

            res.json({ mail, users });
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userIndex } = req.params;

            const users = await getUsersFromFile(PATH_USERS);

            const currentUser = users[userIndex];

            if (!currentUser) {
                res.status(404).json('user not found');

                return;
            }

            res.json(currentUser);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
};
