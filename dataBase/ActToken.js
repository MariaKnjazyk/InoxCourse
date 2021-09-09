const { model, Schema } = require('mongoose');

const { actionEnum, databaseTablesEnum: { ACT_TOKEN, USER } } = require('../configs');

const actTokenSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    [USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    },
    action: {
        enum: Object.values(actionEnum),
        required: true,
        type: String
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

actTokenSchema.pre('findOne', function() {
    this.populate(USER);
});

module.exports = model(ACT_TOKEN, actTokenSchema);
