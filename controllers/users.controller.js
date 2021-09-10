const { User } = require('../dataBase');

const {
    emailActionsEnum: {
        DELETED_BY_ADMIN,
        DELETED_BY_USER,
        USER_CREATED,
        USER_UPDATED,
    },
    statusCodes: {
        ACCEPTED,
        CREATED,
        NO_CONTENT,
    },
    statusMessages: {
        USER_DELETED
    },
    usersRoleENUM: { ADMIN }
} = require('../config');

const { userNormalizer } = require('../utils');

const {
    emailService: { sendMail },
} = require('../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            const normalizedUser = userNormalizer(user);

            res.json(normalizedUser);
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {
                user
            } = req;

            await sendMail(user.email, USER_CREATED, { userName: user.name });

            const newUser = userNormalizer(user);
            res.status(CREATED)
                .json(newUser);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                body,
                params: { id },
            } = req;

            const updatedUser = await User.findByIdAndUpdate(id, { $set: body }, { new: true });

            const normalizedUser = userNormalizer(updatedUser);

            await sendMail(normalizedUser.email, USER_UPDATED, { userName: normalizedUser.name });

            res.status(ACCEPTED)
                .json(normalizedUser);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {
                a_user: { role },
                params: { id },
                user: {
                    name,
                    email
                }
            } = req;

            await User.deleteOne({ _id: id });

            (role === ADMIN)
                ? await sendMail(email, DELETED_BY_ADMIN, { userName: name })
                : await sendMail(email, DELETED_BY_USER, { userName: name });

            res.status(NO_CONTENT)
                .json(USER_DELETED);
        } catch (error) {
            next(error);
        }
    }
};
