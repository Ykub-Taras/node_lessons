const {
    Schema,
    model
} = require('mongoose');
const { variables: { ACTION_MODEL_TOKEN, USERS } } = require('../config');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: USERS,
        required: true
    }
}, { timestamps: true });

module.exports = model(ACTION_MODEL_TOKEN, ActionTokenSchema);
