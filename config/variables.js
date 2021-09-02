module.exports = {
    // APP variables:
    PORT: process.env.PORT || 5050,
    MONGODB_LINK: process.env.MONGODB_LINK || 'mongodb://localhost:27017/lesson6',

    // MODEL variables:
    USERS: 'users',
    RETRO_CARS: 'retroCars',

    //    ARGUMENTS for functions
    VAR_BODY: 'body',
    VAR_ID: 'id',
    VAR_ID_DB_FIELD: '_id',
    VAR_PARAMS: 'params'
};
