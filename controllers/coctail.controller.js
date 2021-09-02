const { Coctail, CoctailCreator } = require('../dataBase');
const { databaseTablesEnum: { COCTAIL, USER }, statusCodes } = require('../configs');

module.exports = {
    createCoctail: async (req, res, next) => {
        try {
            const { loginUser } = req;

            const createdCoctail = await Coctail.create(req.body);

            await CoctailCreator.create({ [COCTAIL]: createdCoctail._id, [USER]: loginUser._id });

            res.status(statusCodes.CREATED).json({ createdCoctail, [USER]: loginUser._id });
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
