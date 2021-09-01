const carNormalizer = (carToNormalize) => {
    const carToNorm = carToNormalize.toJSON();

    const fieldsToRemove = [
        '__v',
        '_id'
    ];

    fieldsToRemove.forEach((field) => {
        delete carToNorm[field];
    });

    return carToNorm;
};

module.exports = carNormalizer;
