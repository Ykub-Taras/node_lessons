const router = require('express').Router();

const { carsController } = require('../controllers');

const {
    dynamicMiddleware: { checkDataForInsertingInDB_byDynamicParam },
    vehicleMiddleware: {
        brandValidation,
        idValidation,
    }
} = require('../middlewares');

const {
    carsValidator: {
        createCarValidator,
        updateCarValidator
    }
} = require('../validators');

router.get('/',
    carsController.getAllCars);
router.post('/',
    checkDataForInsertingInDB_byDynamicParam(createCarValidator),
    brandValidation,
    carsController.createCar);

router.get('/:id',
    idValidation,
    carsController.getCarById);
router.patch('/:id',
    checkDataForInsertingInDB_byDynamicParam(updateCarValidator),
    brandValidation,
    idValidation,
    carsController.updateCar);
router.delete('/:id',
    idValidation,
    carsController.deleteCar);

module.exports = router;
