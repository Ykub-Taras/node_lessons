const router = require('express').Router();

const { authenticationController } = require('../controllers/index');
const { verifyUserLogin, emailValidation } = require('../middlewares/authentication.middleware');

router.post('/',
    verifyUserLogin,
    emailValidation,
    authenticationController.userLogin);

module.exports = router;

// const { emailValidation } = require('../middlewares/userValidation.middleware');
