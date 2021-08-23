const users = require('../../dataBase/users.json');

module.exports = {
    getLoginPage: (req, res) => {
        res.json('Login page.');
    },
    postUserInfo: (req, res) => {
        const { name, password } = req.body;
        const id = users.findIndex((value) => value.name === name && value.password === password);
        id > -1 ? res.redirect(`/v2/users/${id}`) : res.redirect('/v2/registration');
    }
};
