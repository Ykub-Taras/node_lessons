const users = require('../../dataBase/users.json');

module.exports = {
    getLoginPage: (req, res) => {
        res.json('Login page.');
    },
    postUserInfo: (req, res) => {
        const { name, password } = req.body;
        console.log('post auth');
        console.log(req.body);
        console.log(name);
        console.log(password);
        const id = users.findIndex((value) => value.name === name && value.password === password);
        id > -1 ? res.redirect(`/v2/users/${id}`) : res.redirect('/v2/registration');
    }
};
