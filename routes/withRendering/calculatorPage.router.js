const router = require('express').Router();

const { calculatorController } = require('../../controllers/withRendering');

router.get('/:id', calculatorController.getUserInfoAndCalculator);
router.post('/:id', calculatorController.postCalculatorResult);

module.exports = router;
