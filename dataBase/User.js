const { model, Schema } = require('mongoose');

const { databaseTablesEnum: { USER }, userRolesEnum } = require('../configs');

const userSchema = new Schema({
    email: {
        trim: true,
        type: String,
        required: true,
        unique: true
    },

    name: {
        trim: true,
        type: String,
        required: true
    },

    password: {
        trim: true,
        type: String,
        required: true
    },

    role: {
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum),
        type: String
    }
}, { timestamps: true });

module.exports = model(USER, userSchema);
