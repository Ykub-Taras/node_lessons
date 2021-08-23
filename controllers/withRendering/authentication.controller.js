const users = require('../../dataBase/users.json');

module.exports = {
    getLoginPage: (req, res) => { res.render('login'); },
    postUserInfo: (req, res) => {
        const { name, password } = req.body;
        const id = users.findIndex((value) => value.name === name && value.password === password);
        id > -1 ? res.redirect(`/calculator/${id}`) : res.redirect('/registration');
    }
};
