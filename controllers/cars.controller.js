const { Car } = require('../dataBase');

const {
    statusCodes: {
        ACCEPTED,
        CREATED,
        NO_CONTENT
    },
    statusMessages: {
        CAR_DELETED
    }
} = require('../config');

const { carNormalizer } = require('../utils');
const {
    carService
} = require('../services');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars(req.query);

            res.json(cars);
        } catch (error) {
            next(error);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const car = req.foundCar;
            const normalizedCar = carNormalizer(car);

            res.json(normalizedCar);
        } catch (error) {
            next(error);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const newCar = await Car.create(req.body);
            const normalizedCar = carNormalizer(newCar);

            res.status(CREATED)
                .json(normalizedCar);
        } catch (error) {
            next(error);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const {
                body,
                params: { id }
            } = req;

            const updatedCar = await Car.findByIdAndUpdate(id, { $set: body }, { new: true });

            const normalizedCar = carNormalizer(updatedCar);

            res.status(ACCEPTED)
                .json(normalizedCar);
        } catch (error) {
            next(error);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { id } = req.params;

            await Car.deleteOne({ id });

            res.status(NO_CONTENT)
                .json(CAR_DELETED);
        } catch (error) {
            next(error);
        }
    }
};
