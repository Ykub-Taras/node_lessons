const {
    OAuth,
    ActionTokens
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
    variables: {
        AUTHORIZATION,
        REFRESH_TOKEN
    },
    usersRoleENUM: { USER },
} = require('../config');

const { userValidator: { loginValidator } } = require('../validators');

const {
    jwtService: {
        verifyActionToken,
        verifyOAuthToken
    }
} = require('../services');

const authenticationMiddleware = {

    accessTokenValidation: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) throw new ErrorHandler(UNAUTHORIZED, NO_TOKEN);

            await verifyOAuthToken(access_token);

            const DB_token = await OAuth.findOne({ access_token })
                .populate(USER);

            if (!DB_token) throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN);

            req.a_user = DB_token.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    refreshTokenValidation: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) throw new ErrorHandler(UNAUTHORIZED, NO_TOKEN);

            await verifyOAuthToken(refresh_token, REFRESH_TOKEN);

            const DB_token = await OAuth.findOne({ refresh_token })
                .populate(USER);

            if (!DB_token) throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN);

            req.user = DB_token.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    actionTokenValidation: (tokenType) => async (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);

            if (!actionToken) throw new ErrorHandler(UNAUTHORIZED, NO_TOKEN);

            await verifyActionToken(tokenType, actionToken);

            const DB_token = await ActionTokens.findOne({ actionToken })
                .populate(USER);

            if (!DB_token) throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN);

            req.a_user = DB_token.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    receiveToken: (req, res, next) => {
        try {
            const { action_token } = req.query;

            req.headers.authorization = action_token;

            next();
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
