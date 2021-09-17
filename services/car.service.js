const { Car } = require('../dataBase');
const { carNormalizer } = require('../utils');

module.exports = {
    getAllCars: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            orderBy = 'asc',
            sortBy = 'brand',
            ...filters
        } = query;

        const orderType = orderBy === 'asc' ? 1 : -1;

        const filterObject = {};
        const yearFilter = {};
        const priceFilter = {};

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'brand': {
                        filterObject[filterParam] = {
                            $regex: `^${filters[filterParam]}`,
                            $options: 'gi'
                        };
                        break;
                    }
                    case 'model': {
                        filterObject[filterParam] = {
                            $regex: `^${filters[filterParam]}`,
                            $options: 'gi'
                        };
                        break;
                    }
                    case 'year.gte': {
                        Object.assign(yearFilter, { $gte: +filters[filterParam] });
                        break;
                    }
                    case 'year.lte': {
                        Object.assign(yearFilter, { $lte: +filters[filterParam] });
                        break;
                    }
                    case 'price.gte': {
                        Object.assign(priceFilter, { $gte: +filters[filterParam] });
                        break;
                    }
                    case 'price.lte': {
                        Object.assign(priceFilter, { $lte: +filters[filterParam] });
                        break;
                    }
                    default: {
                        filterObject[filterParam] = filters[filterParam];
                    }
                }
            });

        if (Object.keys(yearFilter).length) filterObject.year = yearFilter;

        if (Object.keys(priceFilter).length) filterObject.price = priceFilter;

        const cars = await Car.find(filterObject)
            .sort({ [sortBy]: orderType })
            .limit(+perPage)
            .skip((page - 1) * perPage);
        const normalizedListOfCars = cars.map((car) => carNormalizer(car));
        return normalizedListOfCars;
    }
};
