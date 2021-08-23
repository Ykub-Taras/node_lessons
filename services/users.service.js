const util = require('util');
const fs = require('fs');
const path = require('path');
const users = require('../dataBase/users.json');

const writeFile = util.promisify(fs.writeFile);

async function saveNewUser(name, password) {
    try {
        users.push({ name, password });
        await writeFile(path.join('dataBase', 'users.json'), JSON.stringify(users));
    } catch (error) {
        (console.log(error));
    }
}
module.exports = { saveNewUser };
