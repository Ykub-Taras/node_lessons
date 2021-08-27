const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

module.exports = model('users', userSchema);
