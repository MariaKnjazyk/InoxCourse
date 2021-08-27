const { model, Schema } = require('mongoose');

const { userRolesEnum } = require('../configs');

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

module.exports = model('user', userSchema);
