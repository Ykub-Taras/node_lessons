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
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            console.log(error);
        }
    },

    getUserById: (req, res) => {
        try {
            const user = req.foundUser;
            const normalizedUser = userNormalizer(user);

            res.json(normalizedUser);
        } catch (error) {
            console.log(error);
        }
    },

    createUser: async (req, res) => {
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
            console.log(error);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {
                params: { id },
                body
            } = req;

            const updatedUser = await User.findByIdAndUpdate(id, { $set: body });
            const normalizedUser = userNormalizer(updatedUser);

            res.status(ACCEPTED)
                .json(normalizedUser);
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            await User.deleteOne({ id });

            res.status(NO_CONTENT)
                .json(USER_DELETED);
        } catch (error) {
            console.log(error);
        }
    }
};
