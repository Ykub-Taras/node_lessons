const router = require('express').Router();

const { usersController } = require('../controllers');

const {
    checkBaseConsistent, idValidation, valuesValidation, emailValidation, checkDataForCreateUser, checkDataForUpdateUser
} = require('../middlewares/userValidation.middleware');

router.get('/', checkBaseConsistent, usersController.getAllUsers);

router.get('/:id', idValidation, usersController.getUserById);

router.post('/', valuesValidation, emailValidation, checkDataForCreateUser, usersController.createUser);

router.post('/:id', idValidation, checkDataForUpdateUser, usersController.updateUser);

router.delete('/:id', idValidation, usersController.deleteUser);

module.exports = router;
