const userNormalizer = (userToNormalize) => {
    const userToNorm = userToNormalize.toJSON();

    const fieldsToRemove = [
        'password',
        '__v',
        '_id'
    ];

    fieldsToRemove.forEach((field) => {
        delete userToNorm[field];
    });

    return userToNorm;
};

module.exports = userNormalizer;
