const Coctail = require('../dataBase/Coctail');

module.exports = {
    getAll: async (query = {}) => {
        const {
            order = 'asc',
            page = 1,
            perPage = 10,
            sortBy = 'createdAt',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;
        const filterObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'name': {
                    filterObject[filterParam] = { $regex: `^${filters[filterParam]}`, $options: 'gi' };
                    break;
                }
                case 'ingredients': {
                    const ingredientsArr = filters[filterParam].split(';');
                    filterObject[filterParam] = { $all: ingredientsArr };
                    break;
                }
                default: {
                    const makeArr = filters[filterParam].split(';');
                    filterObject[filterParam] = { $in: makeArr };
                    break;
                }
            }
        });

        const coctails = await Coctail
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        const count = await Coctail.countDocuments(filterObject);

        return {
            data: coctails,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
