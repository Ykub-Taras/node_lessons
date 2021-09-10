const { ErrorHandler } = require('../errors');

const {
    statusMessages: {
        FORBIDDEN_M,
    },
    statusCodes: {
        FORBIDDEN
    }
} = require('../config');
const { User } = require('../dataBase');
const { userNormalizer } = require('../utils');
const { ADMIN } = require('../config/user.roles.enum');
const { BAD_DATA } = require('../config/statusMessages');
const { hashPassword } = require('../services/password.service');

module.exports = {

    createUserMiddleware: (higherAccess = false) => async (req, res, next) => {
        try {
            const {
                body: {
                    password,
                    role
                },
            } = req;

            if (higherAccess && role !== ADMIN) throw new ErrorHandler(FORBIDDEN, BAD_DATA);

            const hPassword = await hashPassword(password);

            const newUser = await User.create({
                ...req.body,
                password: hPassword
            });

            req.user = userNormalizer(newUser);
            next();
        } catch (error) {
            next(error);
        }
    },

    rolePermissions: (higherAccess = false) => (req, res, next) => {
        try {
            const {
                a_user,
                params: { id },
                user
            } = req;

            if ((user.id !== id && !higherAccess) || (a_user.role !== 'admin' && higherAccess)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_M);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
