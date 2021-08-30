const { Coctail } = require('../dataBase');
const { statusCodes } = require('../configs');

module.exports = {
    createCoctail: async (req, res, next) => {
        try {
            const createdCoctail = await Coctail.create(req.body);

            res.status(statusCodes.CREATED).json(createdCoctail);
        } catch (e) {
            next(e);
        }
    },

    deleteCoctail: async (req, res, next) => {
        try {
            const { coctailId } = req.params;

            await Coctail.deleteOne({ _id: coctailId });

            res.status(statusCodes.DELETED).json(`coctail with id ${coctailId} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    getCoctail: async (req, res, next) => {
        try {
            const coctails = await Coctail.find(req.query);

            res.json(coctails);
        } catch (e) {
            next(e);
        }
    },

    getCoctailById: (req, res, next) => {
        try {
            res.json(req.coctail);
        } catch (e) {
            next(e);
        }
    },

    updateCoctail: async (req, res, next) => {
        try {
            const { coctailId } = req.params;

            const coctailUpdate = await Coctail.findByIdAndUpdate(coctailId, req.body);

            res.json(coctailUpdate);
        } catch (e) {
            next(e);
        }
    }

};
