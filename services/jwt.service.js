const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler } = require('../errors');

const {
    actionTokenEnum: {
        ACTIVATE_ACCOUNT,
        ADMIN_CHANGE_PASS,
        CHANGE_PASSWORD,
        FORGOT_PASSWORD
    },
    statusCodes: {
        BAD_REQUEST,
        SERVER_ERROR,
        UNAUTHORIZED,
    },
    statusMessages: { WRONG_TOKEN },
    variables: {
        ACCESS_TOKEN,
        ACTION_TOKEN_A,
        ACTION_TOKEN_C,
        ACTION_TOKEN_F,
        REFRESH_TOKEN
    }
} = require('../config');

const verify_token = promisify(jwt.verify);

function _getSecretWordForActionToken(ActionType) {
    let secret_word = '';
    switch (ActionType) {
        case ADMIN_CHANGE_PASS:
            secret_word = ACTION_TOKEN_A;
            break;
        case ACTIVATE_ACCOUNT:
            secret_word = ACTION_TOKEN_A;
            break;
        case CHANGE_PASSWORD:
            secret_word = ACTION_TOKEN_C;
            break;
        case FORGOT_PASSWORD:
            secret_word = ACTION_TOKEN_F;
            break;
        default:
            throw new ErrorHandler(SERVER_ERROR, WRONG_TOKEN);
    }
    return secret_word;
}

module.exports = {
    generateOAuthTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_TOKEN, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyOAuthToken: async (token, tokenType = ACCESS_TOKEN) => {
        try {
            const secretWord = tokenType === ACCESS_TOKEN ? ACCESS_TOKEN : REFRESH_TOKEN;

            await verify_token(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN);
        }
    },

    generateActionToken: (ActionType) => {
        const secret_word = _getSecretWordForActionToken(ActionType);

        return jwt.sign({}, secret_word, { expiresIn: '7d' });
    },

    verifyActionToken: (ActionType, token) => {
        try {
            const secret_word = _getSecretWordForActionToken(ActionType);

            return verify_token(token, secret_word);
        } catch (e) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_TOKEN);
        }
    },
};
