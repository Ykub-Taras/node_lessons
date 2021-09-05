const { OAuth } = require('../dataBase');

const {
    statusMessages: { DONE },
    variables: { AUTHORIZATION }
} = require('../config');

const {
    jwtService: { generateTokenPair },
    passwordService: { matchPasswords }
} = require('../services');
const { userNormalizer } = require('../utils');

const authenticationController = {
    userLogin: async (req, res, next) => {
        try {
            const {
                body: { password },
                user
            } = req;

            await matchPasswords(password, user.password);

            const tokenPair = await generateTokenPair();

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

            const tokenPair = await generateTokenPair();

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
    }
};

module.exports = authenticationController;
