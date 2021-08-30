const User = require('../dataBase/User');

const { CREATED, ACCEPTED, NO_CONTENT } = require('../config/statusCodes');

const { USER_UPDATED, USER_DELETED } = require('../config/statusMessages');

module.exports = {
    getAllUsers: (req, res) => {
        const users = req.base;
        res.json(users);
    },

    getUserById: (req, res) => {
        const user = req.foundUser;
        res.json(user);
    },

    createUser: async (req, res) => {
        const newUser = await User.create(req.body);
        res.status(CREATED).json(newUser);
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, req.body);
        res.status(ACCEPTED).json(USER_UPDATED);
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        await User.deleteOne({ id });
        res.status(NO_CONTENT).json(USER_DELETED);
    }
};
