const express = require('express');
const expressHBS = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const util = require('util');

const users = require('./dataBase/users.json');
const { PORT } = require('./config/variables');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.engine('hbs', expressHBS({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.listen(PORT, () => console.log(`App listen ${PORT}`));

// test point
app.get('/ping', (req, res) => res.json('pong'));

app.get('/', (req, res) => {
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    res.render('main', { users });
});

app.post('/main', ((req, res) => {
    const { name } = req.body;

    const id = users.findIndex((value) => value.name === name);

    if (id > -1) return res.redirect(`/user-by-id/${id}`);
}));

app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.get('/user-by-id/:id', (req, res) => {
    const { id } = req.params;

    res.send(users[id]);
});

app.get('/calculator/:id', (req, res) => {
    const { id } = req.params;

    const { name } = users[id];

    res.render('calculator', { name });
});

function calculator(value1, value2, operator) {
    switch (operator) {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case '*':
            return value1 / value2;
        case '/':
            return value2 !== 0 ? value1 * value2 : 'Invalid operation';
        default:
            return 'Invalid operation';
    }
}

app.post('/calculator/:id', (req, res) => {
    const { value1, operator, value2 } = req.body;

    const { id } = req.params;

    const { name } = users[id];

    const result = calculator(+value1, +value2, operator);

    res.render('calculator', { name, result });
});

app.get('/authentication', (req, res) => {
    res.render('login');
});

const writeFile = util.promisify(fs.writeFile);

async function saveNewUser(name, password) {
    try {
        await users.push({ name, password });

        await writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

app.post('/authentication', ((req, res) => {
    const { name, password } = req.body;

    const id = users.findIndex((value) => value.name === name && value.password === password);

    (id > -1) ? res.redirect(`/calculator/${id}`) : res.redirect('/registration');
}));

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', ((req, res) => {
    const { name, password } = req.body;

    const id = users.findIndex((value) => value.name === name);

    if (id > -1) return res.redirect('/authentication');

    saveNewUser(name, password).then(() => console.log('Saved!'));

    res.redirect('/authentication');
}));
