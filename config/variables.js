module.exports = {
    // APP variables:
    MONGODB_LINK: process.env.MONGODB_LINK || 'mongodb://localhost:27017/lesson8',
    PORT: process.env.PORT || 5050,

    MAIL_TO: process.env.EMAIL_SANDER || 'test@email.com',

    // MODEL variables / DataBase table ENUM:
    ACTION_MODEL_TOKEN: 'ACTION_MODEL_TOKEN',
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
    ACTION_TOKEN_A: process.env.ACTION_TOKEN_A || 'renew1',
    ACTION_TOKEN_C: process.env.ACTION_TOKEN_C || 'renew2',
    ACTION_TOKEN_F: process.env.ACTION_TOKEN_F || 'renew3',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'refresh',

    // Request arguments
    AUTHORIZATION: 'Authorization',

    //    email sender
    EMAIL_SANDER: process.env.EMAIL_SANDER || 'test@email.com',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://owu.com.ua/',
    PASSWORD_EMAIL_SANDER: process.env.PASSWORD_EMAIL_SANDER || '1234',

    //    other variables

};
