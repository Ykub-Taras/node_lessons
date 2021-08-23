const { saveNewUser } = require('../../services/users.service');
const users = require('../../dataBase/users.json');

module.exports = {
    getRegistrationPage: (req, res) => {
        res.json('Registration page');
    },

    postRegistrationPage: (req, res) => {
        const { name, password } = req.body;
        if (name === undefined || password === undefined) return res.status(406).json('Invalid data!');
        const id = users.findIndex((value) => value.name === name);
        if (id > -1) return res.status(409).json('This user exist in base!');
        saveNewUser(name, password).then(() => console.log('Saved!'));
        res.json('User saved!');
    }
};
