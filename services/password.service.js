const bcrypt = require('bcrypt');

const { UNAUTHORIZED } = require('../config/statusCodes');
const { WRONG_AUTH } = require('../config/statusMessages');

const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {

    hashPassword: (password) => { bcrypt.hash(password, 10); },

    matchPassword: async (password, hash) => {
        const isPassMatched = await bcrypt.compare(password, hash);

        if (!isPassMatched) { throw new ErrorHandler(UNAUTHORIZED, WRONG_AUTH); }
    }

};
