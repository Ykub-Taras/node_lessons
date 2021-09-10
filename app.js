const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv')
    .config();

const {
    variables: {
        PORT,
        MONGODB_LINK
    }
} = require('./config');

const {
    statusCodes: {
        NOT_FOUND,
        SERVER_ERROR
    },
    statusMessages: { NOT_FOUND_M }
} = require('./config');

const app = express();

mongoose.connect(MONGODB_LINK);

const {
    authenticationRouter,
    carsRouter,
    usersRouter
} = require('./routes');

const { checkIfDBEmpty } = require('./utils');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App listen ${PORT}`));
// console.log(process.env);

app.get('/ping', (req, res) => res.json('pong')); // test point

// option without rendering

checkIfDBEmpty();
app.use('/authentication', authenticationRouter);
app.use('/cars', carsRouter);
app.use('/users', usersRouter);

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
    res.status(error.status || SERVER_ERROR)
        .json({ message: error.message });
}
