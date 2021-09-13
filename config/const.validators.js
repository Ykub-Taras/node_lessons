module.exports = {
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    PASSWORD_REGEXP: new RegExp('[a-zA-Z0-9_.+-]'),

    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    MIMETYPES: {
        PHOTO: [
            'image/jpeg',
            'image/png',
            'image/svg+xml'
        ]
    }
};
