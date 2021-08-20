const express = require('express');
const expressHBS = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const util = require('util');

const users = require('./dataBase/users.json');
const {PORT} = require('./config/variables');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs');
app.engine('hbs', expressHBS({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.listen(PORT, () => console.log(`App listen ${PORT}`));

// test point
app.get('/ping', (req, res) => res.json('pong'));

app.get('/', (req, res) => {res.redirect('/main')});

app.get('/main', (req, res) => {res.render('main', {users})});

app.post('/main', ((req, res) => {
    const {name} = req.body
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            res.redirect(`/users/${i}`)
        }
    }
}));

app.get('/users', (req, res) => {res.render('users', {users})});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = users[id];
res.render('calculator', {name});
});


app.get('/authentication', (req, res) => {res.render('login')});

// ------------------------------

// function saveNewUser(name, password) {
//     return new Promise((resolve, reject) => {
//         users.push({name: name, password: password})
//         fs.writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users), (err) => {
//             if (err) reject(err)
//             resolve("File saved.")
//         })
//     });
// }

const writeFile = util.promisify(fs.writeFile);

async function saveNewUser(name, password) {
    try {
        await users.push({name, password});
        await writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users))
    } catch (error) {
        (console.log(error))
    }
    }


app.post('/authentication', ((req, res) => {
    const {name, password} = req.body;
    let status = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name && users[i].password === password) {status= i}}
    status !== null ? res.redirect(`/users/${status}`) : res.redirect(`/registration`)
}));

app.get('/registration', (req, res) => {
    res.render('registration')
});

app.post('/registration', ((req, res) => {
    const {name, password} = req.body
    let status = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            status = true
        }
    }
    if (status) {
        res.redirect(`/authentication`)
    } else {
        saveNewUser(name, password).then(() => console.log('Saved!'));
        res.redirect(`/authentication`)
    }}))
