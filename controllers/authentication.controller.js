const {
    emailActionsEnum: { USER_AUTHORIZED },
    statusMessages: {
        DONE,
        CHANGE_ADMIN_PASSWORD
    },
    statusCodes: {
        ACCEPTED,
        CHANGE_METHOD_ON_POST
    },
    usersRoleENUM: { ADMIN },
    variables: {
        AUTHORIZATION,
        FRONTEND_URL,
        reset_path,
        set_token
    }
} = require('../config');

const {
    ActionTokens,
    OAuth,
    User
} = require('../dataBase');

const {
    emailService: { sendMail },
    jwtService: {
        generateActionToken,
        generateOAuthTokenPair
    },
    passwordService: {
        hashPassword,
        matchPasswords
    },
} = require('../services');

const { userNormalizer } = require('../utils');

const authenticationController = {
    activateAccount: async (req, res, next) => {
        try {
            const { a_user } = req;

            await ActionTokens.deleteOne({ user: a_user._id });

            res.json(DONE);
        } catch (e) {
            next(e);
        }
    },

    userLogin: async (req, res, next) => {
        try {
            const {
                body: { password },
                user
            } = req;

            if (password === ADMIN) {
                console.log(CHANGE_ADMIN_PASSWORD);
                return res.redirect(CHANGE_METHOD_ON_POST, `${reset_path}send`);
            }

            await matchPasswords(password, user.password);

            const tokenPair = await generateOAuthTokenPair();

            await OAuth.create({
                ...tokenPair,
                user: user._id
            });

            const normalizedUser = userNormalizer(user);

            await sendMail(
                normalizedUser.email,
                USER_AUTHORIZED,
                { userName: normalizedUser.name }
            );

            res.json({
                ...tokenPair,
                normalizedUser
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.json(DONE);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const { user } = req;

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = await generateOAuthTokenPair();

            await OAuth.create({
                ...tokenPair,
                user: user._id
            });

            const normalizedUser = userNormalizer(user);

            res.json({
                ...tokenPair,
                normalizedUser
            });
        } catch (e) {
            next(e);
        }
    },

    sendEmailResetPass: (typeActionToken, typeEmail) => async (req, res, next) => {
        try {
            const {
                user,
                a_user
            } = req;
            const actionToken = generateActionToken(typeActionToken);

            await ActionTokens.create({
                token: actionToken,
                user: user._id
            });

            let content = {
                userName: user.name,
                resetPassURL: `${FRONTEND_URL}${reset_path}${set_token}${actionToken}`
            };
            if (a_user) {
                content = {
                    ...content,
                    adminName: a_user.name
                };
            }

            await sendMail(
                user.email,
                typeEmail,
                content
            );

            res.status(ACCEPTED)
                .json(DONE);
        } catch (e) {
            next(e);
        }
    },

    resetPass: async (req, res, next) => {
        try {
            const {
                body: { password },
                a_user
            } = req;
            const token = req.get(AUTHORIZATION);

            const hashedPassword = await hashPassword(password);

            await User.findByIdAndUpdate(
                a_user._id,
                { password: hashedPassword }
            );

            await ActionTokens.deleteOne({ token });

            await OAuth.deleteMany({ user: a_user._id });

            res.json(DONE);
        } catch (e) {
            next(e);
        }
    },

    changePass: async (req, res, next) => {
        try {
            const {
                body: {
                    oldPassword,
                    password
                },
                a_user
            } = req;

            await matchPasswords(oldPassword, a_user.password);

            const hashedPassword = await hashPassword(password);

            await User.findByIdAndUpdate(
                a_user._id,
                { password: hashedPassword }
            );

            await OAuth.deleteMany({ user: a_user._id });

            res.json(DONE);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authenticationController;
