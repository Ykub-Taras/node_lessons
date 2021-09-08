const { Car } = require('../dataBase');

const { ErrorHandler } = require('../errors');

const {
    statusCodes: {
        BAD_REQUEST,
        CONFLICT
    },
    statusMessages: {
        WRONG_ID,
        BRAND_CONFLICT
    }
} = require('../config');

module.exports = {

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
            const { id } = req.params;
            const foundCar = await Car.findById(id);

            if (!foundCar) {
                throw new ErrorHandler(BAD_REQUEST, WRONG_ID);
            }

            req.foundCar = foundCar;
            next();
        } catch (e) {
            next(e);
        }
    },

};
