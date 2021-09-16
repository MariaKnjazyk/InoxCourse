const User = require('../dataBase/User');
const userUtil = require('../utils/user.util');

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
        const born_year_filter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'born_year_from': {
                    Object.assign(born_year_filter, { $gte: +filters[filterParam] });
                    break;
                }
                case 'born_year_to': {
                    Object.assign(born_year_filter, { $lte: +filters[filterParam] });
                    break;
                }
                case 'name': {
                    filterObject[filterParam] = { $regex: `^${filters[filterParam]}`, $options: 'gi' };
                    break;
                }
                case 'role': {
                    const rolesArr = filters[filterParam].split(';');
                    filterObject[filterParam] = { $in: rolesArr };
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        if (Object.keys(born_year_filter).length) {
            filterObject.born_year = born_year_filter;
        }

        const users = await User
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        const usersNorm = users.map((user) => userUtil.userNormalizator(user));

        const count = await User.countDocuments(filterObject);

        return {
            data: usersNorm,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
