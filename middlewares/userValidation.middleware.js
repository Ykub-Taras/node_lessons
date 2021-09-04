const { User } = require('../dataBase');

const { ErrorHandler } = require('../errors');

const {
    statusMessages: {
        BAD_DATA,
        FORBIDDEN,
        EMAIL_CONFLICT
    },
    statusCodes: {
        BAD_REQUEST,
        CONFLICT
    }
} = require('../config');

const {
    userValidator: {
        createUserValidator,
        updateUserValidator
    }
} = require('../validators');

module.exports = {

    emailValidation: async (req, res, next) => {
        try {
            const { email } = req.body;
            const emailSaved = await User.findOne({ email });

            if (emailSaved) {
                throw new ErrorHandler(CONFLICT, EMAIL_CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDataForCreateUser: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDataForUpdateUser: (req, res, next) => {
        try {
            const { error } = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const foundUser = await User.findOne({ [dbFiled]: value });

            if (!foundUser) {
                throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
            }

            req.foundUser = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    rolePermissions: (role, higherAccess = false) => (req, res, next) => {
        try {
            const {
                params: { id },
                user
            } = req;

            if (!role === 'admin' && higherAccess) {
                throw new ErrorHandler(CONFLICT, FORBIDDEN);
            }

            if ((role === 'user' || role === 'admin') && user._id === id) {
                return next();
            }
        } catch (e) {
            next(e);
        }
    }

};
