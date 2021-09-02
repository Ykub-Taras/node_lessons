const router = require('express')
    .Router();

const { usersController } = require('../controllers');

const {
    userMiddleware: {
        checkDataForCreateUser,
        checkDataForUpdateUser,
        getUserByDynamicParam,
        emailValidation,
    }
} = require('../middlewares');

const {
    var_id,
    var_id_db_field,
    var_params
} = require('../config/variables');

router.get('/',
    usersController.getAllUsers);
router.post('/',
    checkDataForCreateUser,
    emailValidation,
    usersController.createUser);

router.get('/:id',
    getUserByDynamicParam(var_id, var_params, var_id_db_field),
    usersController.getUserById);
router.patch('/:id',
    checkDataForUpdateUser,
    getUserByDynamicParam(var_id, var_params, var_id_db_field),
    usersController.updateUser);
router.delete('/:id',
    getUserByDynamicParam(var_id, var_params, var_id_db_field),
    usersController.deleteUser);

module.exports = router;
