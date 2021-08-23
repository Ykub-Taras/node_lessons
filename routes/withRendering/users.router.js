const router = require('express').Router();

const { usersController } = require('../../controllers/withRendering');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;
