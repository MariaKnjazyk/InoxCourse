const { model, Schema } = require('mongoose');

const carSchema = new Schema({
    model: {
        trim: true,
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
