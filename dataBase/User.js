const {
    Schema,
    model
} = require('mongoose');

const {
    variables: { USERS },
    usersRoleENUM
} = require('../config');

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
        password: {
            type: String,
            required: true,
            trim: true,
            select: false
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: usersRoleENUM.USER,
            enum: Object.values(usersRoleENUM)
        }
    }, { timestamps: true }
);

module.exports = model(USERS, userSchema);
