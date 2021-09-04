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
const { VAR_BODY } = require('../config/variables');

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

module.exports = router;
