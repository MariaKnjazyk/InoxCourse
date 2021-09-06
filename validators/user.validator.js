const Joi = require('joi');

const { regexes: { EMAIL_REGEXP, ID_REGEXP, PASSWORD_REGEXP }, userRolesEnum } = require('../configs');

const auth = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
});

const changePasswordForgot = Joi.object({
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required()
});

const changePasswordForgotUser = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
});

const changePasswordReset = Joi.object({
    oldPassword: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required()
});

const create = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    name: Joi.string().alphanum().trim().required()
        .min(2)
        .max(30),
    password: Joi.string().trim().regex(PASSWORD_REGEXP).required(),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

const id = Joi.object({
    userId: Joi.string().trim().regex(ID_REGEXP)
});

const updateOrFind = Joi.object({
    email: Joi.string().trim().regex(EMAIL_REGEXP),
    name: Joi.string().trim().alphanum()
        .min(2)
        .max(30),
    role: Joi.string().valid(...Object.values(userRolesEnum))
});

module.exports = {
    auth,
    changePasswordForgot,
    changePasswordForgotUser,
    changePasswordReset,
    create,
    updateOrFind,
    id
};
