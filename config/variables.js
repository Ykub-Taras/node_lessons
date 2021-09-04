module.exports = {
    // APP variables:
    PORT: process.env.PORT || 5050,
    MONGODB_LINK: process.env.MONGODB_LINK || 'mongodb://localhost:27017/lesson7',

    // MODEL variables:
    OAUTH: 'oauth',
    USERS: 'users',
    RETRO_CARS: 'retroCars',

    // ARGUMENTS for functions
    VAR_BODY: 'body',
    VAR_EMAIL: 'email',
    VAR_ID: 'id',
    VAR_ID_DB_FIELD: '_id',
    VAR_PARAMS: 'params',

    // TOKEN variables
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'access',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'refresh',

    // Request arguments
    AUTHORIZATION: 'Authorization'
};
