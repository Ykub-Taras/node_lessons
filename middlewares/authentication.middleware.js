const User = require('../dataBase/User');

const ErrorHandler = require('../errors/ErrorHandler');

const { BAD_REQUEST, NOT_FOUND } = require('../config/statusCodes');

const {
    BAD_DATA, EMAIL_CONFLICT
} = require('../config/statusMessages');

const { loginValidator } = require('../validators/user.validator');

const authenticationMiddleware = {
    verifyUserLogin: (req, res, next) => {
        try {
            const { error } = loginValidator.validate(req.body);

            if (error) {
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
