const Car = require('../dataBase/Car');

const ErrorHandler = require('../errors/ErrorHandler');

const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../config/statusCodes');

const {
    EMPTY_BASE, WRONG_ID, BRAND_CONFLICT, BAD_PRICE, BAD_YEAR

} = require('../config/statusMessages');

module.exports = {

    yearValidation: (req, res, next) => {
        try {
            const { year } = req.body;
            if (year < 1885 || year > 1980) {
                throw new ErrorHandler(BAD_REQUEST, BAD_YEAR);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    priceValidation: (req, res, next) => {
        try {
            const { price } = req.body;
            if (price < 0) {
                throw new ErrorHandler(BAD_REQUEST, BAD_PRICE);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    brandValidation: async (req, res, next) => {
        try {
            const { brand } = req.body;
            const brandSaved = await Car.findOne({ brand });
            if (brandSaved) {
                throw new ErrorHandler(CONFLICT, BRAND_CONFLICT);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    idValidation: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const foundCar = await Car.findOne(car_id);
            if (!foundCar) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_ID);
            }
            req.foundCar = foundCar;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkBaseConsistent: async (req, res, next) => {
        try {
            const cars = await Car.find();
            if (cars.length === 0) {
                throw new ErrorHandler(NOT_FOUND, EMPTY_BASE);
            }
            req.base = cars;
            next();
        } catch (e) {
            next(e);
        }
    }
};
