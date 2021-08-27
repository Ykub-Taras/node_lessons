const User = require('../dataBase/User');

const ErrorHandler = require('../errors/ErrorHandler');

const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../config/statusCodes');

const {
    NO_DATA, BAD_DATA, EMAIL_CONFLICT, WRONG_ID, EMPTY_BASE
} = require('../config/statusMessages');

module.exports = {

    valuesValidation: (req, res, next) => {
        try {
            const {
                name, email, address, phone
            } = req.body;
            if (!name || !email || !address || !phone) {
                throw new ErrorHandler(BAD_REQUEST, NO_DATA);
            }
            // eslint-disable-next-line max-len
            if (typeof (name) !== 'string' || typeof (email) !== 'string' || typeof (address) !== 'string' || typeof (phone) !== 'string') {
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
            const emailSaved = await User.findOne({ email });
            if (emailSaved) {
                throw new ErrorHandler(CONFLICT, EMAIL_CONFLICT);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    idValidation: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const foundUser = await User.findOne(user_id);
            if (!foundUser) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_ID);
            }
            req.foundUser = foundUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkBaseConsistent: async (req, res, next) => {
        try {
            const users = await User.find();
            if (users.length === 0) {
                throw new ErrorHandler(NOT_FOUND, EMPTY_BASE);
            }
            req.base = users;
            next();
        } catch (e) {
            next(e);
        }
    }
};
