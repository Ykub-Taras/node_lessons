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
    VAR_ID,
    VAR_ID_DB_FIELD,
    VAR_PARAMS
} = require('../config/variables');

router.get('/',
    usersController.getAllUsers);
router.post('/',
    checkDataForCreateUser,
    emailValidation,
    usersController.createUser);

router.get('/:id',
    getUserByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.getUserById);
router.patch('/:id',
    checkDataForUpdateUser,
    getUserByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.updateUser);
router.delete('/:id',
    getUserByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.deleteUser);

module.exports = router;
