const { model, Schema } = require('mongoose');

const { databaseTablesEnum: { INACTIVE_ACCOUNT, USER } } = require('../configs');

const inactiveAccountSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(INACTIVE_ACCOUNT, inactiveAccountSchema);
