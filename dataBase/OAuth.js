const {
    Schema,
    model
} = require('mongoose');
const { variables: { OAUTH, USERS } } = require('../config');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },

    refresh_token: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USERS
    }
}, { timestamps: true });

module.exports = model(OAUTH, OAuthSchema);
