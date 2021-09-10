const { User } = require('../dataBase');

const { ErrorHandler } = require('../errors');

const {
    statusMessages: {
        BAD_DATA,
        EMAIL_CONFLICT
    },
    statusCodes: {
        BAD_REQUEST,
        CONFLICT
    }
} = require('../config');

module.exports = {
    getDataByDynamicParam: (
        paramName, searchIn = 'body', dbFiled = paramName, password = false, specialTrigger = false
    ) => async (req, res, next) => {
        try {
            let foundUser;

            const value = req[searchIn][paramName];

            // Adding password to response if needed
            password
                ? foundUser = await User.findOne({ [dbFiled]: value }).select('+password')
                : foundUser = await User.findOne({ [dbFiled]: value });

            // Switching type of response depending on user's status
            if (!foundUser && !specialTrigger) throw new ErrorHandler(BAD_REQUEST, BAD_DATA);

            if (foundUser && specialTrigger) throw new ErrorHandler(CONFLICT, EMAIL_CONFLICT);

            req.user = foundUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkDataForInsertingInDB_byDynamicParam: (typeOfValidator) => (req, res, next) => {
        try {
            const { error, value } = typeOfValidator.validate(req.body);

            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

};
