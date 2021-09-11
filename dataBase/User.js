const { model, Schema } = require('mongoose');

const { databaseTablesEnum: { USER }, userRolesEnum } = require('../configs');
const { passwordService } = require('../services');

const userSchema = new Schema({
    avatar: {
        type: String
    },

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

userSchema.statics = {
    async createWithHashPassword(userObject) {
        const hashPassword = await passwordService.hash(userObject.password);

        return this.create({ ...userObject, password: hashPassword });
    }
};

module.exports = model(USER, userSchema);
