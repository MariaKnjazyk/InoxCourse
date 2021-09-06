const { FORGOT_PASSWORD, WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'Are you forgot your password?'
    }
};
