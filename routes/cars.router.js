const router = require('express').Router();

const { carsController } = require('../controllers');

const {
    brandValidation, idValidation, checkBaseConsistent, yearValidation, priceValidation
} = require('../middlewares/vehicleValidation.middleware');

router.get('/', checkBaseConsistent, carsController.getAllCars);

router.get('/:id', idValidation, carsController.getCarById);

router.post('/', priceValidation, yearValidation, brandValidation, carsController.createCar);

router.post('/:id', priceValidation, yearValidation, brandValidation, idValidation, carsController.updateCar);

router.delete('/:id', idValidation, carsController.deleteCar);

module.exports = router;
