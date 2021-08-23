const users = require('../../dataBase/users.json');

module.exports = {
    getMainPage: (req, res) => {
        res.render('main', { users });
    },
    postUserInfo: (req, res) => {
        const { name } = req.body;
        const id = users.findIndex((value) => value.name === name);
        if (id > -1) return res.redirect(`/users/${id}`);
    }
};
