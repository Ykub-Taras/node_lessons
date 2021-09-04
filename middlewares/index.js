module.exports = {
    authenticationMiddleware: require('./authentication.middleware'),
    dynamicMiddleware: require('./dynamic.middleware'),
    userMiddleware: require('./userValidation.middleware'),
    vehicleMiddleware: require('./vehicleValidation.middleware')
};
