const {
    statusMessages: { DONE },
    variables: {
        AUTHORIZATION,
        FRONTEND_URL
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
    passwordService: { matchPasswords },
} = require('../services');

const { userNormalizer } = require('../utils');
const { hashPassword } = require('../services/password.service');
const { ADMIN } = require('../config/user.roles.enum');
const { FORBIDDEN } = require('../config/statusCodes');
const { CHANGE_ADMIN_PASSWORD } = require('../config/statusMessages');
const ErrorHandler = require('../errors/ErrorHandler');

const authenticationController = {
    userLogin: async (req, res, next) => {
        try {
            const {
                body: { password },
                user
            } = req;

            if (user.name === ADMIN && password === ADMIN) throw new ErrorHandler(FORBIDDEN, CHANGE_ADMIN_PASSWORD);

            await matchPasswords(password, user.password);
            const tokenPair = await generateOAuthTokenPair();

            await OAuth.create({
                ...tokenPair,
                user: user._id
            });

            const normalizedUser = userNormalizer(user);
            // await sendMail(normalizedUser.email, USER_AUTHORIZED, { userName: normalizedUser.name });
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
            const { user } = req;
            const actionToken = generateActionToken(typeActionToken);

            await ActionTokens.create({
                token: actionToken,
                user: user._id
            });

            await sendMail(
                user.mail,
                typeEmail,
                {
                    resetPassURL: `${FRONTEND_URL}/password?token=${actionToken}`
                }
            );
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

            await User.findByIdAndUpdate(a_user._id, { password: hashedPassword });

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
                body: { password },
                a_user
            } = req;
            const hashedPassword = await hashPassword(password);

            await User.findByIdAndUpdate(a_user._id, { password: hashedPassword });

            await OAuth.deleteMany({ user: a_user._id });

            res.json(DONE);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authenticationController;
