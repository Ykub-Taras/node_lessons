const router = require('express').Router();

const { authorizationControllerV2 } = require('../../controllers/withOutRendering');

router.get('/', authorizationControllerV2.getLoginPage);
router.post('/', authorizationControllerV2.postUserInfo);

module.exports = router;
