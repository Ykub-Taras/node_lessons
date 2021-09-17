const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../config/const.validators');

const { usersRoleENUM } = require('../config');

const emailSchema = Joi.string().regex(EMAIL_REGEXP).trim().required();
const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).trim().required();

const createUserValidator = Joi.object({

    name: Joi.string().alphanum().min(2).max(30).trim().required(),
    password: passwordSchema,
    email: emailSchema,
    address: Joi.string().alphanum().min(3).max(30).trim().required(),
    phone: Joi.string().min(8).max(10).required(),
    role: Joi.string().allow(...Object.values(usersRoleENUM))

});

const updateUserValidator = Joi.object({

    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: emailSchema,
    address: Joi.string().alphanum().min(5).max(30).trim(),
    phone: Joi.number().min(10).max(10),
    role: Joi.string().allow(...Object.values(usersRoleENUM))

});

const emailValidator = Joi.object({
    email: emailSchema
});

const loginValidator = Joi.object({
    email: emailSchema,
    password: passwordSchema
});

const passwordValidator = Joi.object({
    password: passwordSchema
});

const oldNewPasswordValidator = Joi.object({
    oldPassword: passwordSchema,
    password: passwordSchema,
});

module.exports = {
    createUserValidator,
    emailValidator,
    loginValidator,
    oldNewPasswordValidator,
    passwordValidator,
    updateUserValidator
};
