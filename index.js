const express = require('express');
const path = require('path');
const expressHBS = require('express-handlebars');

const { PORT } = require('./config/variables');

const app = express();

const {
    authenticationRouter,
    calculatorRouter,
    mainPageRoute,
    registrationRouter,
    usersRouter
} = require('./routes/withRendering');

const {
    authenticationRouterV2,
    registrationRouterV2,
    usersRouterV2
} = require('./routes/withOutRendering');

// HBS для роботи з версією, що рендериться.
app.set('view engine', 'hbs');
app.engine('hbs', expressHBS({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App listen ${PORT}`));

app.get('/ping', (req, res) => res.json('pong')); // test point

app.get('/', (req, res) => { res.redirect('/main'); }); // redirecting to main page

// option with rendering
app.use('/main', mainPageRoute);

app.use('/authentication', authenticationRouter);

app.use('/registration', registrationRouter);

app.use('/users', usersRouter);

app.use('/calculator', calculatorRouter);

// option without rendering
app.use('/v2/authentication', authenticationRouterV2);

app.use('/v2/registration', registrationRouterV2);

app.use('/v2/users', usersRouterV2);
