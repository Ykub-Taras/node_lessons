const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler } = require('../errors');
const { statusMessages: { WRONG_TOKEN } } = require('../config');
const { variables: { ACCESS_TOKEN, REFRESH_TOKEN } } = require('../config');

const verify_token = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_TOKEN, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secretWord = tokenType === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN;

            await verify_token(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(401, WRONG_TOKEN);
        }
    }
};
