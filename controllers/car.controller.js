const { Car } = require('../dataBase');
const { statusCodes } = require('../configs');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const createdCar = await Car.create(req.body);

            res.status(statusCodes.CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await Car.deleteOne({ _id: carId });

            res.status(statusCodes.DELETED).json(`Car with id ${carId} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const cars = await Car.find(req.query);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const carUpdate = await Car.findByIdAndUpdate(carId, req.body);

            res.json(carUpdate);
        } catch (e) {
            next(e);
        }
    }

};
