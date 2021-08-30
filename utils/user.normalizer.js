module.exports = {
    userNormalizer: (userToNormalize) => {
        const fieldsToRemove = [
            'password',
            '__v',
            '_id'
        ];

        userToNormalize = userToNormalize.toJSON();
        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    },
};
