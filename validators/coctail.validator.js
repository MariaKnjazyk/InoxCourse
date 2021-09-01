const Joi = require('joi');

const { coctailEnum, regexes: { ID_REGEXP } } = require('../configs');

const ingredValidator = Joi.string().alphanum().trim().min(2)
    .max(30);

module.exports = {
    create: Joi.object({
        name: Joi.string().trim().min(2).max(30)
            .required(),
        ingredients: Joi.array().items(ingredValidator).required(),
        make: Joi.string().valid(...Object.values(coctailEnum.make)),
        strength_volume: Joi.string().valid(...Object.values(coctailEnum.strength_volume)).required(),
        time: Joi.string().valid(...Object.values(coctailEnum.time)),
        taste: Joi.string().valid(...Object.values(coctailEnum.taste)),
    }),

    id: Joi.object({
        coctailId: Joi.string().trim().regex(ID_REGEXP)
    }),

    updateOrFind: Joi.object({
        name: Joi.string().trim().min(2).max(30),
        ingredients: Joi.array().items(ingredValidator),
        make: Joi.string().valid(...Object.values(coctailEnum.make)),
        strength_volume: Joi.string().valid(...Object.values(coctailEnum.strength_volume)),
        time: Joi.string().valid(...Object.values(coctailEnum.time)),
        taste: Joi.string().valid(...Object.values(coctailEnum.taste)),
    })
};
