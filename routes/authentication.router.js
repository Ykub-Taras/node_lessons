const router = require('express')
    .Router();

const {
    authenticationController: {
        userLogin,
        logoutUser,
        refresh
    }
} = require('../controllers');
const {
    authenticationMiddleware: {
        accessTokenValidation,
        refreshTokenValidation,
        verifyUserLogin
    },
    dynamicMiddleware: { getDataByDynamicParam }
} = require('../middlewares');
const { variables: { VAR_EMAIL } } = require('../config');

router.post('/',
    verifyUserLogin,
    getDataByDynamicParam(VAR_EMAIL, {}, {}, true),
    userLogin);

router.post('/logout',
    accessTokenValidation,
    logoutUser);
router.post('/refresh',
    refreshTokenValidation,
    refresh);

module.exports = router;
