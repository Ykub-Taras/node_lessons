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

let foundUser;

module.exports = {
    getDataByDynamicParam: (
        paramName, searchIn = 'body', dbFiled = paramName, password = false, specialTrigger = false
    ) => async (req, res, next) => {
        try {
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
    }
};

// -----------------------------------------
// if (password) {
//     foundUser = await User.findOne({ [dbFiled]: value })
//         .select('+password');
// } else {
//     foundUser = await User.findOne({ [dbFiled]: value });
// }

// console.log('paramName: ', paramName);
// console.log('searchIn: ', searchIn);
// console.log('value: ', value);
// console.log('password: ', password);
// console.log('uniqTrigger: ', uniqTrigger);
// console.log('foundUser: ', foundUser);
