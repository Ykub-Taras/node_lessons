module.exports = {
    userNormalizer: (userToNormalize) => {
        const fieldsToRemove = [
            'password',
            '__v',
            '_id'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    },
};
