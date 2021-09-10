const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../config/const.validators');

const { usersRoleENUM } = require('../config');

const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).trim().required();

const createUserValidator = Joi.object({

    name: Joi.string().alphanum().min(2).max(30).trim().required(),
    password: passwordSchema,
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    address: Joi.string().alphanum().min(3).max(30).trim().required(),
    phone: Joi.string().min(8).max(10).required(),
    role: Joi.string().allow(...Object.values(usersRoleENUM))

});

const updateUserValidator = Joi.object({

    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: Joi.string().regex(EMAIL_REGEXP).trim(),
    address: Joi.string().alphanum().min(5).max(30).trim(),
    phone: Joi.number().min(10).max(10),
    role: Joi.string().allow(...Object.values(usersRoleENUM))

});

const loginValidator = Joi.object({

    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: passwordSchema

});

const passwordValidator = Joi.object({
    password: passwordSchema

});

module.exports = {
    createUserValidator,
    loginValidator,
    passwordValidator,
    updateUserValidator
};
