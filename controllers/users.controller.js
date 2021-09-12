const {
    User,
    ActionTokens
} = require('../dataBase');

const {
    emailActionsEnum: {
        ACTIVATION_BY_EMAIL,
        DELETED_BY_ADMIN,
        DELETED_BY_USER,
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
    usersRoleENUM: { ADMIN },
    variables: {
        FRONTEND_URL,
        activate_path,
        set_token
    }
} = require('../config');

const { userNormalizer } = require('../utils');

const {
    emailService: { sendMail },
    jwtService: { generateActionToken }
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

    createUser: (typeActionToken) => async (req, res, next) => {
        try {
            const {
                user
            } = req;
            const newUser = userNormalizer(user);

            const actionToken = generateActionToken(typeActionToken);

            await ActionTokens.create({
                token: actionToken,
                user: newUser._id
            });

            await sendMail(user.email, ACTIVATION_BY_EMAIL, {
                userName: user.name,
                setPassURL: FRONTEND_URL + activate_path + set_token + actionToken
            });

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

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: body },
                { new: true }
            );

            const normalizedUser = userNormalizer(updatedUser);

            await sendMail(normalizedUser.email,
                USER_UPDATED,
                { userName: normalizedUser.name });

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
