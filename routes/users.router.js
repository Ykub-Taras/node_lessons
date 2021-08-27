const router = require('express').Router();

const { usersController } = require('../controllers');

const {
    checkBaseConsistent, idValidation, valuesValidation, emailValidation
} = require('../middlewares/userValidation.middleware');

router.get('/', checkBaseConsistent, usersController.getAllUsers);

router.get('/:id', idValidation, usersController.getUserById);

router.post('/', valuesValidation, emailValidation, usersController.createUser);

router.post('/:id', idValidation, usersController.updateUser);

router.delete('/:id', idValidation, usersController.deleteUser);

module.exports = router;
