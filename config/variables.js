module.exports = {
    // APP variables:
    PORT: process.env.PORT || 5050,
    MONGODB_LINK: process.env.MONGODB_LINK || 'mongodb://localhost:27017/lesson6',

    // MODEL variables:
    users: 'users',
    retroCars: 'retroCars',

    //    ARGUMENTS for functions
    var_body: 'body',
    var_id: 'id',
    var_id_db_field: '_id',
    var_params: 'params'
};
