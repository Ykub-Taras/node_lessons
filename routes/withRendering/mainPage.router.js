const router = require('express').Router();

const { mainPageController } = require('../../controllers/withRendering');

router.get('/', mainPageController.getMainPage);
router.post('/', mainPageController.postUserInfo);

module.exports = router;
