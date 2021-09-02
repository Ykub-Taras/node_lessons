const bcrypt = require('bcrypt');

const {
    statusCodes: { UNAUTHORIZED },
    statusMessages: { WRONG_AUTH }
} = require('../config');

const { ErrorHandler } = require('../errors');

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    matchPassword: async (password, hash) => {
        const isPassMatched = await bcrypt.compare(password, hash);

        if (!isPassMatched) { throw new ErrorHandler(UNAUTHORIZED, WRONG_AUTH); }
    }
};
