const router = require('express').Router();

const { usersControllerV2 } = require('../../controllers/withOutRendering');

router.get('/', usersControllerV2.getUsers);
router.get('/:id', usersControllerV2.getUserById);

module.exports = router;
