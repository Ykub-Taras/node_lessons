const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { PORT, MONGODB_LINK } = require('./config/variables');

const { NOT_FOUND, SERVER_ERROR } = require('./config/statusCodes');
const { NOT_FOUND_M } = require('./config/statusMessages');

const app = express();

mongoose.connect(MONGODB_LINK);

const {
    authenticationRouter,
    carsRouter,
    usersRouter
} = require('./routes');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App listen ${PORT}`));

app.get('/ping', (req, res) => res.json('pong')); // test point

// option without rendering

app.use('/authentication', authenticationRouter);

app.use('/users', usersRouter);

app.use('/cars', carsRouter);

app.use('*', _notFoundError);

app.use(_errorHandler);

// ---------- Error handlers ---------
function _notFoundError(error, req, res, next) {
    next({
        status: error.status || NOT_FOUND,
        message: error.message || NOT_FOUND_M

    });
}

// eslint-disable-next-line no-unused-vars
function _errorHandler(error, req, res, next) {
    res.status(error.status || SERVER_ERROR).json({ message: error.message });
}

// ДЗ:
// Вам необхідно реалізувати CRUD на дві сутності (user, car)
// Мають бути реалізовані такі методи:
// 1) Create user
// 2) Get all users
// 3) Get user by id
// 4) Delete current user
// 5) Update user
// Все це має бути розбито по роутах, контроллерах, сервісах з обовязковою перевіркою всього що приходить через мідлвари.
// Також всі меджік стрінги мають бути винесені в константи.
// додати errorHandler

// #Практическая
// создать схему RetroCar c такими полями
// - brand
// - model
// - year
// - price
// произвести валидации:
// год должен быть в диапазоне 1885-1980
// цена не меньше 0
// brand уникальный
// + CRUD
