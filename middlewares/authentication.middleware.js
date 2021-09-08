const {
    OAuth
} = require('../dataBase');

const { ErrorHandler } = require('../errors');

const {
    statusCodes: {
        BAD_REQUEST,
        UNAUTHORIZED
    },
    statusMessages: {
        BAD_DATA,
        NO_TOKEN,
        WRONG_TOKEN
    },
    variables: { AUTHORIZATION }
} = require('../config');

const { userValidator: { loginValidator } } = require('../validators');

const { jwtService: { verifyToken } } = require('../services');

const authenticationMiddleware = {

    accessTokenValidation: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) throw new ErrorHandler(UNAUTHORIZED, NO_TOKEN);

            await verifyToken(access_token);

            const DB_token = await OAuth.findOne({ access_token })
                .populate('user');

            if (!DB_token) throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN);

            next();
        } catch (e) {
            next(e);
        }
    },

    refreshTokenValidation: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) throw new ErrorHandler(UNAUTHORIZED, NO_TOKEN);

            await verifyToken(refresh_token, 'refresh');

            const DB_token = await OAuth.findOne({ refresh_token })
                .populate('user');

            if (!DB_token) throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN);

            req.user = DB_token.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserLogged: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) return next();

            await verifyToken(access_token);

            const DB_token = await OAuth.findOne({ access_token })
                .populate('user');

            res.redirect(`/users/${DB_token.user.id}`);
        } catch (e) {
            next(e);
        }
    },

    verifyUserLogin: (req, res, next) => {
        try {
            const { error } = loginValidator.validate(req.body);

            if (error) throw new ErrorHandler(BAD_REQUEST, BAD_DATA);

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authenticationMiddleware;
