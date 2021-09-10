const { User } = require('../dataBase');

const checkIfDBEmpty = async () => {
    try {
        if (!User.length) {
            const newUser = await User.create({
                name: 'Admin',
                email: 'admin@owu.com.ua',
                password: 'admin',
                address: '',
                phone: '',
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

module.exports = checkIfDBEmpty;
