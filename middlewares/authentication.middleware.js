const { User } = require('../dataBase');

const { ErrorHandler } = require('../errors');

const {
    statusCodes: {
        BAD_REQUEST,
        NOT_FOUND
    },
    statusMessages: {
        BAD_DATA,
        EMAIL_CONFLICT
    }
} = require('../config');

const { userValidator: { loginValidator } } = require('../validators');

const authenticationMiddleware = {
    verifyUserLogin: (req, res, next) => {
        try {
            const { error } = loginValidator.validate(req.body);

            if (error) {
                console.log(error);
                throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    emailValidation: async (req, res, next) => {
        try {
            const { email } = req.body;
            const savedData = await User.findOne({ email }).select('+password');
            if (!savedData) {
                throw new ErrorHandler(NOT_FOUND, EMAIL_CONFLICT);
            }
            req.user = savedData;
            next();
        } catch (e) {
            next(e);
        }
    },
};

module.exports = authenticationMiddleware;
