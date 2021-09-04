const { User } = require('../dataBase');

const {
    statusCodes: {
        CREATED,
        ACCEPTED,
        NO_CONTENT
    },
    statusMessages: {
        USER_DELETED
    }
} = require('../config');

const { userNormalizer } = require('../utils');

const { passwordService: { hashPassword } } = require('../services');

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
            const { password } = req.body;

            const hPassword = await hashPassword(password);

            const newUser = await User.create({
                ...req.body,
                password: hPassword
            });

            const normalizedUser = userNormalizer(newUser);

            res.status(CREATED)
                .json(normalizedUser);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                params: { id },
                body
            } = req;

            const updatedUser = await User.findByIdAndUpdate(id, { $set: body }, { new: true });

            const normalizedUser = userNormalizer(updatedUser);

            res.status(ACCEPTED)
                .json(normalizedUser);
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            await User.deleteOne({ _id: id });

            res.status(NO_CONTENT).json(USER_DELETED);
        } catch (error) {
            next(error);
        }
    }
};
