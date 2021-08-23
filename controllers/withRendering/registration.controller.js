const { saveNewUser } = require('../../services/users.service');
const users = require('../../dataBase/users.json');

module.exports = {
    getRegistrationPage: (req, res) => {
        res.render('registration');
    },

    postRegistrationPage: (req, res) => {
        const { name, password } = req.body;
        const id = users.findIndex((value) => value.name === name);
        if (id > -1) return res.redirect('/authentication');
        saveNewUser(name, password).then(() => console.log('Saved!'));
        res.redirect('/authentication');
    }
};
