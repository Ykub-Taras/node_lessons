const router = require('express')
    .Router();

const { carsController } = require('../controllers');

const {
    vehicleMiddleware: {
        brandValidation,
        checkDataForCreateCar,
        checkDataForUpdateCar,
        idValidation,
    }
} = require('../middlewares');

router.get('/', carsController.getAllCars);
router.post('/', checkDataForCreateCar, brandValidation, carsController.createCar);

router.get('/:id', idValidation, carsController.getCarById);
router.patch('/:id', checkDataForUpdateCar, brandValidation, idValidation, carsController.updateCar);
router.delete('/:id', idValidation, carsController.deleteCar);

module.exports = router;
