const { Car } = require('../dataBase');

const { CREATED, ACCEPTED, NO_CONTENT } = require('../config/statusCodes');

const { CAR_UPDATED, CAR_DELETED } = require('../config/statusMessages');
const { carNormalizer } = require('../utils/user.normalizer');

module.exports = {
    getAllCars: async (req, res) => {
        const cars = await Car.find();

        res.json(cars);
    },

    getCarById: (req, res) => {
        const car = req.foundCar;
        const normalizedCar = carNormalizer(car);

        res.json(normalizedCar);
    },

    createCar: async (req, res) => {
        const newCar = await Car.create(req.body);
        res.status(CREATED).json(newCar);
    },

    updateCar: async (req, res) => {
        const { id } = req.params;
        const updateObject = req.body;

        const updatedCar = await Car.findByIdAndUpdate(id, { $set: updateObject });

        const normalizedCar = carNormalizer(updatedCar);

        res.status(ACCEPTED).json(CAR_UPDATED, normalizedCar);
    },

    deleteCar: async (req, res) => {
        const { id } = req.params;
        await Car.deleteOne({ id });
        res.status(NO_CONTENT).json(CAR_DELETED);
    }
};
