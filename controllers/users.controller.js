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
        NO_CONTENT
    },
    statusMessages: {
        USER_DELETED
    },
    variables: { MAIL_TO }
} = require('../config');

const { userNormalizer } = require('../utils');

const {
    emailService: { sendMail },
    passwordService: { hashPassword }
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
                body: { password },
            } = req;

            const hPassword = await hashPassword(password);

            const newUser = await User.create({
                ...req.body,
                password: hPassword
            });

            const normalizedUser = userNormalizer(newUser);

            await sendMail(MAIL_TO, USER_CREATED, normalizedUser.name);
            res.status(CREATED)
                .json(normalizedUser);
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

            await sendMail(MAIL_TO, USER_UPDATED, normalizedUser.name);
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
                user: { name }
            } = req;

            await User.deleteOne({ _id: id });
            // await User.findOne({ _id: id });

            (role === 'admin')
                ? await sendMail(MAIL_TO, DELETED_BY_ADMIN, name)
                : await sendMail(MAIL_TO, DELETED_BY_USER, name);

            res.status(NO_CONTENT)
                .json(USER_DELETED);
        } catch (error) {
            next(error);
        }
    }
};
