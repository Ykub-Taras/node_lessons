const router = require('express')
    .Router();

const {
    authenticationController: {
        activateAccount,
        changePass,
        logoutUser,
        refresh,
        resetPass,
        sendEmailResetPass,
        userLogin,
    }
} = require('../controllers');

const {
    variables: {
        VAR_BODY,
        VAR_EMAIL
    },
    actionTokenEnum: {
        ACTIVATE_ACCOUNT,
        FORGOT_PASSWORD
    },
    emailActionsEnum: { FORGOT_PASS }
} = require('../config');

const {
    authenticationMiddleware: {
        actionTokenValidation,
        accessTokenValidation,
        refreshTokenValidation,
        receiveToken,
        verifyUserLogin
    },
    dynamicMiddleware: {
        checkDataForInsertingInDB_byDynamicParam,
        getDataByDynamicParam
    }
} = require('../middlewares');

const {
    userValidator: {
        passwordValidator
    }
} = require('../validators');

router.post('/',
    verifyUserLogin,
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY, VAR_EMAIL, true),
    userLogin);

router.post('/logout',
    accessTokenValidation,
    logoutUser);
router.post('/refresh',
    refreshTokenValidation,
    refresh);

router.post('/activation',
    receiveToken,
    actionTokenValidation(ACTIVATE_ACCOUNT),
    activateAccount);

router.post('/password/reset/send',
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY),
    sendEmailResetPass(FORGOT_PASSWORD, FORGOT_PASS));
router.post('/password/reset/set',
    checkDataForInsertingInDB_byDynamicParam(passwordValidator),
    actionTokenValidation(FORGOT_PASSWORD),
    resetPass);
router.post('/password/change',
    checkDataForInsertingInDB_byDynamicParam(passwordValidator),
    accessTokenValidation,
    changePass);
module.exports = router;
