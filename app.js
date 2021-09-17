const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const swaggerUiExpress = require('swagger-ui-express');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const path = require('path');

require('dotenv')
    .config();

const {
    statusCodes: {
        FORBIDDEN,
        NOT_FOUND,
        SERVER_ERROR
    },
    statusMessages: {
        CORS_FORBIDDEN,
        FIRST_USER_ERR,
        NOT_FOUND_M
    },
    variables: {
        ALLOWED_ORIGINS,
        EXPRESS_STATIC,
        MONGODB_LINK,
        PORT,
    }
} = require('./config');
const cron = require('./cron');
const swaggerJson = require('./docs/swagger.json');
const { ErrorHandler } = require('./errors');
const {
    authenticationRouter,
    carsRouter,
    usersRouter
} = require('./routes');
const { checkIfDBEmpty } = require('./utils');

const app = express();

mongoose.connect(MONGODB_LINK);

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));

app.use(cors({ origin: _configureCors }));

app.use(helmet());

app.use(expressRateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
}));

app.use(express.static(path.join(__dirname, EXPRESS_STATIC)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

// Scheduled task execution:
(cron)();

// Creation of first user if DB is empty || alternative: (checkIfDBEmpty())();
checkIfDBEmpty()
    .then(() => {
    }, (error) => {
        console.log(FIRST_USER_ERR, error);
        throw error;
    });

app.listen(PORT, () => console.log(`App listen ${PORT}`));
// console.log(process.env);

app.get('/ping', (req, res) => res.json('pong')); // test point

// option without rendering
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

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(FORBIDDEN, CORS_FORBIDDEN), false);
    }

    return callback(null, true);
}
