const users = require('../../dataBase/users.json');

module.exports = {
    getUsers: (req, res) => {
        res.json({ users });
    },
    getUserById: (req, res) => {
        const { id } = req.params;
        (id <= users.length && id > -1) ? res.json(users[id]) : res.status(406).json('Such user doesnt exist');
    }
};
