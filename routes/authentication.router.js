const router = require('express').Router();

const { authenticationController } = require('../controllers/index');
const {
    authenticationMiddleware: {
        verifyUserLogin,
        emailValidation
    }
} = require('../middlewares');

router.post('/',
    verifyUserLogin,
    emailValidation,
    authenticationController.userLogin);

module.exports = router;
