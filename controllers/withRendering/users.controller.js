const users = require('../../dataBase/users.json');

module.exports = {
    getUsers: (req, res) => {
        res.render('users', { users });
    },
    getUserById: (req, res) => {
        const { id } = req.params;
        res.send(users[id]);
    }
};
