const router = require('express').Router();

const { registrationController } = require('../../controllers/withRendering');

router.get('/', registrationController.getRegistrationPage);
router.post('/', registrationController.postRegistrationPage);

module.exports = router;
