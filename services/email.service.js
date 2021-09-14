const EmailTemplate = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const templatesInfo = require('../email-templates');
const {
    constants,
    errors,
    variables
} = require('../configs');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: variables.EMAIL_BROADCAST,
        pass: variables.EMAIL_BROADCAST_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];
    context = { ...context, frontendURL: variables.FRONTEND_URL };

    if (!templateToSend) {
        throw new ErrorHandler(
            errors.INTERNAL_SERVER_ERROR.WRONG_TEMPLATE_NAME.status,
            errors.INTERNAL_SERVER_ERROR.WRONG_TEMPLATE_NAME.customCode,
            errors.INTERNAL_SERVER_ERROR.WRONG_TEMPLATE_NAME.message
        );
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: constants.NO_REPLY,
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
