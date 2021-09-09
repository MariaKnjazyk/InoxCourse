const { CREATE_ADMIN, FORGOT_PASSWORD, WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [CREATE_ADMIN]: {
        templateName: CREATE_ADMIN,
        subject: 'Create account'
    },
    [FORGOT_PASSWORD]: {
        templateName: FORGOT_PASSWORD,
        subject: 'Are you forgot your password?'
    },
    [WELCOME]: {
        templateName: WELCOME,
        subject: 'Welcome on board'
    }
};
