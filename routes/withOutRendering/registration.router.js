const router = require('express').Router();

const { registrationControllerV2 } = require('../../controllers/withOutRendering');

router.get('/', registrationControllerV2.getRegistrationPage);
router.post('/', registrationControllerV2.postRegistrationPage);

module.exports = router;
