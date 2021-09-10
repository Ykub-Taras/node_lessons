const {
    statusMessages: {
        FORBIDDEN_M,
        BAD_DATA
    },
    statusCodes: {
        FORBIDDEN
    },
    usersRoleENUM: { ADMIN }
} = require('../config');
const { User } = require('../dataBase');

const { ErrorHandler } = require('../errors');

const { passwordService: { hashPassword } } = require('../services');

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

            req.user = newUser;
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

            let user_id;
            (!user) ? user_id = a_user.id : user_id = user.id;

            if ((user_id !== id && !higherAccess) || (a_user.role !== ADMIN && higherAccess)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_M);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
