const { User } = require('../dataBase');
const { userNormalizer } = require('../utils');

module.exports = {
    getAllUsers: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            orderBy = 'asc',
            sortBy = 'name',
            ...filters
        } = query;

        const orderType = orderBy === 'asc' ? 1 : -1;

        const filterObject = {};
        const ageFilter = {};
        const YOBFilter = {};

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'role': {
                        const rolesArr = filters[filterParam].split(';');
                        filterObject[filterParam] = { $in: rolesArr };
                        break;
                    }
                    case 'name': {
                        filterObject[filterParam] = {
                            $regex: `^${filters[filterParam]}`,
                            $options: 'gi'
                        };
                        break;
                    }
                    case 'age.gte': {
                        Object.assign(ageFilter, { $gte: +filters[filterParam] });
                        break;
                    }
                    case 'age.lte': {
                        Object.assign(ageFilter, { $lte: +filters[filterParam] });
                        break;
                    }
                    // Year Of Birth abbreviation
                    case 'YOB.gte': {
                        Object.assign(YOBFilter, { $gte: +filters[filterParam] });
                        break;
                    }
                    case 'YOB.lte': {
                        Object.assign(YOBFilter, { $lte: +filters[filterParam] });
                        break;
                    }
                    default: {
                        filterObject[filterParam] = filters[filterParam];
                    }
                }
            });

        if (Object.keys(ageFilter).length) filterObject.age = ageFilter;

        if (Object.keys(YOBFilter).length) filterObject.YOB = YOBFilter;

        const users = await User.find(filterObject)
            .sort({ [sortBy]: orderType })
            .limit(+perPage)
            .skip((page - 1) * perPage);
        const normalizedListOfUsers = users.map((user) => userNormalizer(user));
        return normalizedListOfUsers;
    }
};
