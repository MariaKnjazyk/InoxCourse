const { ActToken, User } = require('../dataBase');
const { jwtService, emailService } = require('../services');
const {
    actionEnum: { FORGOT_PASSWORD },
    constants: { QUERY_ACTION_TOKEN, SYSTEM },
    userRolesEnum: { SUPER_ADMIN },
    emailActionsEnum,
    databaseTablesEnum: { USER },
    variables: {
        TEMP_PASS,
        FRONTEND_URL_PASSWORD,
        NAME_SUPER_ADMIN,
        EMAIL_SUPER_ADMIN
    }
} = require('../configs');

const createByAdmin = async (name, email, role, creatorName = SYSTEM, password = TEMP_PASS + Math.random()) => {
    const user = await User.createWithHashPassword(
        {
            name,
            password,
            email,
            role
        }
    );

    const action_token = await jwtService.generateActionToken(FORGOT_PASSWORD);

    await ActToken.create({ action_token, [USER]: user._id, action: FORGOT_PASSWORD });

    await emailService.sendMail(
        user.email,
        emailActionsEnum.CREATE_ADMIN,
        {
            userName: user.name,
            creatorName,
            userRole: user.role,
            activeTokenURL: FRONTEND_URL_PASSWORD + QUERY_ACTION_TOKEN + action_token
        }
    );
};

const checkCreateSuperAdmin = async () => {
    const superAdmin = await User.findOne({ role: SUPER_ADMIN });

    if (!superAdmin) {
        await createByAdmin(NAME_SUPER_ADMIN, EMAIL_SUPER_ADMIN, SUPER_ADMIN);
    }
};

module.exports = {
    checkCreateSuperAdmin,
    createByAdmin
};
