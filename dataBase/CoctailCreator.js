const { model, Schema } = require('mongoose');

const { databaseTablesEnum: { COCTAIL, COCTAIL_CREATOR, USER } } = require('../configs');

const coctailCreatorSchema = new Schema({
    [COCTAIL]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: COCTAIL
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, { timestamps: true });

module.exports = model(COCTAIL_CREATOR, coctailCreatorSchema);
