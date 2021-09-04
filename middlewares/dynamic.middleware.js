const { User } = require('../dataBase');

const { ErrorHandler } = require('../errors');

const {
    statusMessages: {
        BAD_DATA
    },
    statusCodes: {
        BAD_REQUEST
    }
} = require('../config');

let foundUser;

module.exports = {
    getDataByDynamicParam: (
        paramName, searchIn = 'body', dbFiled = paramName, password = false, uniqTrigger = false
    ) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            // Adding password to response if needed
            if (password) {
                foundUser = await User.findOne({ [dbFiled]: value })
                    .select('+password');
            } else {
                foundUser = await User.findOne({ [dbFiled]: value });
            }

            // Switching type of response in different user status
            if (!foundUser && !uniqTrigger) {
                throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
            }

            if (foundUser && uniqTrigger) {
                throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
            }

            req.user = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    }
};
