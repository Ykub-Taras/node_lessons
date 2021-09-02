const { Schema, model } = require('mongoose');

const { variables: { retroCars } } = require('../config');

const retroCarSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

module.exports = model(retroCars, retroCarSchema);
