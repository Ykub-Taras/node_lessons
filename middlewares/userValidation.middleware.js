const { ErrorHandler } = require('../errors');

const {
    statusMessages: {
        FORBIDDEN_M,
    },
    statusCodes: {
        FORBIDDEN
    }
} = require('../config');

module.exports = {

    rolePermissions: (higherAccess = false) => (req, res, next) => {
        try {
            const {
                a_user,
                params: { id },
                user
            } = req;

            if ((user.id !== id && !higherAccess) || (a_user.role !== 'admin' && higherAccess)) {
                throw new ErrorHandler(FORBIDDEN, FORBIDDEN_M);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

//-------------------------------------
//
// getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
//     try {
//         const value = req[searchIn][paramName];
//
//         const foundUser = await User.findOne({ [dbFiled]: value });
//
//         if (!foundUser) {
//             throw new ErrorHandler(BAD_REQUEST, BAD_DATA);
//         }
//
//         req.foundUser = foundUser;
//
//         next();
//     } catch (e) {
//         next(e);
//     }
// },

// -------------

// emailValidation: async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         const emailSaved = await User.findOne({ email });
//
//         if (emailSaved) {
//             throw new ErrorHandler(CONFLICT, EMAIL_CONFLICT);
//         }
//
//         next();
//     } catch (e) {
//         next(e);
//     }
// },
