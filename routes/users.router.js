const router = require('express')
    .Router();

const { usersController } = require('../controllers');

const {
    variables: {
        VAR_BODY,
        VAR_EMAIL,
        VAR_ID,
        VAR_ID_DB_FIELD,
        VAR_PARAMS
    }

} = require('../config');

const {
    userMiddleware: {
        rolePermissions
    },
    dynamicMiddleware: {
        checkDataForInsertingInDB_byDynamicParam,
        getDataByDynamicParam
    },
    authenticationMiddleware: { accessTokenValidation }
} = require('../middlewares');

const {
    userValidator: {
        createUserValidator,
        updateUserValidator
    }
} = require('../validators');

router.get('/',
    usersController.getAllUsers);
router.post('/',
    checkDataForInsertingInDB_byDynamicParam(createUserValidator),
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY, VAR_EMAIL, true, true),
    usersController.createUser);

router.get('/:id',
    accessTokenValidation,
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.getUserById);
router.patch('/:id',
    checkDataForInsertingInDB_byDynamicParam(updateUserValidator),
    accessTokenValidation,
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    rolePermissions(),
    usersController.updateUser);
router.delete('/:id',
    accessTokenValidation,
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    rolePermissions(true),
    usersController.deleteUser);

module.exports = router;
