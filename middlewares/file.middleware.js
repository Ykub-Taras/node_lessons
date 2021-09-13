const {
    constValidators: {
        MIMETYPES,
        PHOTO_MAX_SIZE,
    },
    statusCodes: { BAD_REQUEST },
    statusMessages: { WRONG_FILE_TYPE }
} = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                return next();
            }
            const {
                name,
                size,
                mimetype
            } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(BAD_REQUEST, `'File ${name} is too big. Max size is 5mb!`);
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_FILE_TYPE);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
