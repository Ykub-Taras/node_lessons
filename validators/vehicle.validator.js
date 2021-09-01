const Joi = require('joi');

const createCarValidator = Joi.object({
    brand: Joi.string().alphanum().min(2).max(30).trim().required(),
    model: Joi.string().alphanum().min(2).max(30).trim().required(),
    year: Joi.number().min(1885).max(1980).required(),
    price: Joi.number().min(1).required()
});

const updateCarValidator = Joi.object({
    brand: Joi.string().alphanum().min(2).max(30).trim(),
    model: Joi.string().alphanum().min(2).max(30).trim(),
    year: Joi.number().min(1885).max(1980),
    price: Joi.number().min(1)

});

module.exports = { createCarValidator, updateCarValidator };
