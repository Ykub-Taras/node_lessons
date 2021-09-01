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
        const users = await User.find();
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

            const newUser = await User.create({
                ...req.body,
                password: hPassword
            });

            const normalizedUser = userNormalizer(newUser);

            res.status(CREATED)
                .json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const updateObject = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateObject });

        const normalizedUser = userNormalizer(updatedUser);
        // res.json(updatedUser);
        res.status(ACCEPTED).json(normalizedUser);
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        await User.deleteOne({ id });
        res.status(NO_CONTENT)
            .json(USER_DELETED);
    }
};
