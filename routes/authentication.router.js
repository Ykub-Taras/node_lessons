const router = require('express').Router();

const {
    authenticationController: {
        logoutUser,
        refresh,
        userLogin
    }
} = require('../controllers');

const { variables: { VAR_EMAIL } } = require('../config');

const {
    authenticationMiddleware: {
        accessTokenValidation,
        isUserLogged,
        refreshTokenValidation,
        verifyUserLogin
    },
    dynamicMiddleware: { getDataByDynamicParam }
} = require('../middlewares');

const { VAR_BODY } = require('../config/variables');

router.post('/',
    verifyUserLogin,
    isUserLogged,
    getDataByDynamicParam(VAR_EMAIL, VAR_BODY, VAR_EMAIL, true),
    userLogin);

router.post('/logout',
    accessTokenValidation,
    logoutUser);
router.post('/refresh',
    refreshTokenValidation,
    refresh);

module.exports = router;
