const { User } = require('../dataBase');

module.exports = async function checkIfDBEmpty() {
    try {
        const numberOfUsers = await User.count();

        if (numberOfUsers === 0) {
            const newUser = await User.create({
                name: 'admin',
                email: 'admin@owu.com.ua',
                password: 'admin',
                address: 'xxxxxxxxxx',
                phone: '1234567890',
                role: 'admin',
            });

            console.log('DataBase was empty, new record of administrator was created: ');
            console.log(newUser);
            console.log('Please, change password and renew data of administrator!');
        }
    } catch (error) {
        console.log(error);
    }
};
