const router = require('express').Router();

const { authorizationController } = require('../../controllers/withRendering');

router.get('/', authorizationController.getLoginPage);
router.post('/', authorizationController.postUserInfo);

module.exports = router;
