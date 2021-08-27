const Car = require('../dataBase/Car');

const { CREATED, ACCEPTED, NO_CONTENT } = require('../config/statusCodes');

const { CAR_UPDATED, CAR_DELETED } = require('../config/statusMessages');

module.exports = {
    getAllCars: (req, res) => {
        const cars = req.base;
        res.json(cars);
    },

    getCarById: (req, res) => {
        const car = req.foundCar;
        res.json(car);
    },

    createCar: async (req, res) => {
        const newCar = await Car.create(req.body);
        res.status(CREATED).json(newCar);
    },

    updateCar: async (req, res) => {
        const { id } = req.params;
        await Car.findByIdAndUpdate(id, req.body);
        res.status(ACCEPTED).json(CAR_UPDATED);
    },

    deleteCar: async (req, res) => {
        const { id } = req.params;
        await Car.deleteOne({ id });
        res.status(NO_CONTENT).json(CAR_DELETED);
    }
};

// **** deleteCar

// const deletedCar = await Car.findByIdAndDelete(id);
// res.json(deletedCar);

// **** createCar

// const {
//     brand, model, year, price
// } = req.body;
// await Car.create({ brand }, { model }, { year }, { price });
