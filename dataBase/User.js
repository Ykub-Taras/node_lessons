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
        address: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: false,
        },
        avatar: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false
        },

        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: usersRoleENUM.USER,
            enum: Object.values(usersRoleENUM)
        },

        YOB: /* Year Of Birth abbreviation */ {
            type: Number,
            required: false,
        }

    }, { timestamps: true }
);

module.exports = model(USERS, userSchema);
