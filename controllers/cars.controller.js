const { Car } = require('../dataBase');

const {
    statusCodes: {
        CREATED,
        ACCEPTED,
        NO_CONTENT
    },
    statusMessages: {
        CAR_DELETED
    }
} = require('../config');

const { carNormalizer } = require('../utils');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await Car.find();

            res.json(cars);
        } catch (error) {
            console.log(error);
        }
    },

    getCarById: (req, res) => {
        try {
            const car = req.foundCar;
            const normalizedCar = carNormalizer(car);

            res.json(normalizedCar);
        } catch (error) {
            console.log(error);
        }
    },

    createCar: async (req, res) => {
        try {
            const newCar = await Car.create(req.body);
            const normalizedCar = carNormalizer(newCar);

            res.status(CREATED)
                .json(normalizedCar);
        } catch (error) {
            console.log(error);
        }
    },

    updateCar: async (req, res) => {
        try {
            const {
                params: { id },
                body
            } = req;

            await Car.findByIdAndUpdate(id, { $set: body });

            const updatedCar = await Car.findById(id);

            const normalizedCar = carNormalizer(updatedCar);

            res.status(ACCEPTED)
                .json(normalizedCar);
        } catch (error) {
            console.log(error);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { id } = req.params;

            await Car.deleteOne({ id });

            res.status(NO_CONTENT)
                .json(CAR_DELETED);
        } catch (error) {
            console.log(error);
        }
    }
};
