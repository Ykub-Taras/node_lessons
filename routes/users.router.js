const router = require('express')
    .Router();

const { usersController } = require('../controllers');

const {
    variables: {
        VAR_ID,
        VAR_ID_DB_FIELD,
        VAR_PARAMS,
        VAR_EMAIL
    },
    usersRoleENUM: { USER, ADMIN }
} = require('../config');

const {
    userMiddleware: {
        checkDataForCreateUser,
        checkDataForUpdateUser,
        rolePermissions
    },
    dynamicMiddleware: { getDataByDynamicParam },
    authenticationMiddleware: { accessTokenValidation }
} = require('../middlewares');

router.get('/',
    usersController.getAllUsers);
router.post('/',
    checkDataForCreateUser,
    getDataByDynamicParam(VAR_EMAIL, {}, {}, {}, true),
    usersController.createUser);

router.get('/:id',
    accessTokenValidation,
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.getUserById);
router.patch('/:id',
    checkDataForUpdateUser,
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    accessTokenValidation,
    rolePermissions(USER),
    usersController.updateUser);
router.delete('/:id',
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    accessTokenValidation,
    rolePermissions(ADMIN, true),
    usersController.deleteUser);

module.exports = router;
