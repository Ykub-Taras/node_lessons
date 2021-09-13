const router = require('express')
    .Router();

const {
    usersController,
    authenticationController
} = require('../controllers');

const {
    actionTokenEnum: { ADMIN_CHANGE_PASS, ACTIVATE_ACCOUNT },
    emailActionsEnum: { ADMIN_CREATED },
    variables: {
        VAR_BODY,
        VAR_EMAIL,
        VAR_ID,
        VAR_ID_DB_FIELD,
        VAR_PARAMS
    }

} = require('../config');

const {
    authenticationMiddleware: { accessTokenValidation },

    dynamicMiddleware: {
        checkDataForInsertingInDB_byDynamicParam,
        getDataByDynamicParam
    },
    fileMiddleware: { checkAvatar },
    userMiddleware: {
        createUserMiddleware,
        rolePermissions
    },
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
    checkAvatar,
    checkDataForInsertingInDB_byDynamicParam(createUserValidator),
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY, VAR_EMAIL, true, true),
    createUserMiddleware(),
    usersController.createUser(ACTIVATE_ACCOUNT));

router.get('/:id',
    accessTokenValidation,
    getDataByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    usersController.getUserById);
router.patch('/:id',
    checkAvatar,
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

router.post('/new_admin',
    checkDataForInsertingInDB_byDynamicParam(createUserValidator),
    accessTokenValidation,
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY, VAR_EMAIL, true, true),
    rolePermissions(true),
    createUserMiddleware(true),
    authenticationController.sendEmailResetPass(ADMIN_CHANGE_PASS, ADMIN_CREATED));

module.exports = router;
