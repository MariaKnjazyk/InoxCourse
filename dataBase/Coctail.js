const { model, Schema } = require('mongoose');

const { coctailEnum, databaseTablesEnum: { COCTAIL } } = require('../configs');

const coctailSchema = new Schema({
    name: {
        trim: true,
        type: String,
        required: true,
        unique: true
    },

    ingredients: {
        trim: true,
        type: [String],
        required: true
    },

    make: {
        enum: Object.values(coctailEnum.make),
        type: String
    },

    strength_volume: {
        enum: Object.values(coctailEnum.strength_volume),
        type: String,
        required: true
    },

    time: {
        enum: Object.values(coctailEnum.time),
        type: String
    },

    taste: {
        enum: Object.values(coctailEnum.taste),
        type: String
    }
}, { timestamps: true });

module.exports = model(COCTAIL, coctailSchema);
