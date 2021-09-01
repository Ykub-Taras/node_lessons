module.exports = {
    userNormalizer: (userToNormalize) => {
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
    },

    carNormalizer: (carToNormalize) => {
        const carToNorm = carToNormalize.toJSON();

        const fieldsToRemove = [
            '__v',
            '_id'
        ];

        fieldsToRemove.forEach((field) => {
            delete carToNorm[field];
        });

        return carToNorm;
    },
};
