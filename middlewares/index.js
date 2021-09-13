module.exports = {
    authenticationMiddleware: require('./authentication.middleware'),
    fileMiddleware: require('./file.middleware'),
    dynamicMiddleware: require('./dynamic.middleware'),
    userMiddleware: require('./userValidation.middleware'),
    vehicleMiddleware: require('./vehicleValidation.middleware')
};
