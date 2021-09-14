module.exports = (query) => {
    const searchBy = {};

    if (Object.keys(query).length) {
        for (const key in query) {
            switch (key) {
                case 'born_year_from':
                    if (searchBy.born_year) {
                        searchBy.born_year.$gte = +query[key];
                        break;
                    }
                    searchBy.born_year = { $gte: +query[key] };
                    break;
                case 'born_year_to':
                    if (searchBy.born_year) {
                        searchBy.born_year.$lte = +query[key];
                        break;
                    }
                    searchBy.born_year = { $lte: +query[key] };
                    break;
                default:
                    searchBy[key] = query[key];
            }
        }
    }

    return searchBy;
};
