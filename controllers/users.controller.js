const User = require('../dataBase/User');

const { CREATED, ACCEPTED, NO_CONTENT } = require('../config/statusCodes');

const { USER_UPDATED, USER_DELETED } = require('../config/statusMessages');

const { userNormalizer } = require('../utils/user.normalizer');

const { hashPassword } = require('../services/password.service');

module.exports = {
    getAllUsers: (req, res) => {
        const users = req.base;
        res.json(users);
    },

    getUserById: (req, res) => {
        const user = req.foundUser;
        // console.log(user)
        const normalizedUser = userNormalizer(user);

        res.json(normalizedUser);
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hPassword = await hashPassword(password);

            const newUser = await User.create({ ...req.body, password: hPassword });

            const normalizedUser = userNormalizer(newUser);

            res.status(CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id, req.body);

        const normalizedUser = userNormalizer(updatedUser);

        res.status(ACCEPTED).json(USER_UPDATED, normalizedUser);
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        await User.deleteOne({ id });
        res.status(NO_CONTENT).json(USER_DELETED);
    }
};
