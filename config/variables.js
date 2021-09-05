module.exports = {
    // APP variables:
    MONGODB_LINK: process.env.MONGODB_LINK || 'mongodb://localhost:27017/lesson7',
    PORT: process.env.PORT || 5050,

    // MODEL variables:
    OAUTH: 'oauth',
    RETRO_CARS: 'retroCars',
    USERS: 'users',

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
