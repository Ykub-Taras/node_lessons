const router = require('express')
    .Router();

const { usersController } = require('../controllers');

const {
    userMiddleware: {
        checkDataForCreateUser,
        checkDataForUpdateUser,
        getUserByDynamicParam,
        emailValidation,
        idValidation
    }
} = require('../middlewares');

router.get('/',
    usersController.getAllUsers);
router.post('/',
    checkDataForCreateUser,
    emailValidation,
    usersController.createUser);

router.get('/:id',
    getUserByDynamicParam('id', 'params', '_id'),
    usersController.getUserById);
router.patch('/:id',
    checkDataForUpdateUser,
    idValidation,
    usersController.updateUser);
router.delete('/:id',
    idValidation,
    usersController.deleteUser);

module.exports = router;
