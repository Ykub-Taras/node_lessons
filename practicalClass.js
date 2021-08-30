// ********** Practical class 01 **************

// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');

const manOlder20 = path.join(__dirname, 'manOlder20');
const manYounger20 = path.join(__dirname, 'manYounger20');
const womanOlder20 = path.join(__dirname, 'womanOlder20');
const womanYounger20 = path.join(__dirname, 'womanYounger20');

function makeDir(name) {
    fs.mkdirSync(name, { recursive: true });
}

makeDir(manOlder20);
makeDir(manYounger20);
makeDir(womanOlder20);
makeDir(womanYounger20);

const users = [
    { name: 'Olya', gender: 'female', age: 21 },
    { name: 'Valya', gender: 'female', age: 22 },
    { name: 'Natasha', gender: 'female', age: 23 },
    { name: 'Lena', gender: 'female', age: 14 },
    { name: 'Ulya', gender: 'female', age: 15 },
    { name: 'Vasya', gender: 'male', age: 21 },
    { name: 'Petya', gender: 'male', age: 22 },
    { name: 'Sasha', gender: 'male', age: 23 },
    { name: 'Seryu', gender: 'male', age: 14 },
    { name: 'Vitalik', gender: 'male', age: 15 }
];

function createFilesOfUsers() {
    users.forEach((user) => {
        const filePath_Name = path.join(__dirname,
            `${user.gender === 'male' ? 'man' : 'woman'}${user.age < 20 ? 'Older20' : 'Younger20'}`,
            `${user.name}.txt`);

        const content = JSON.stringify(user).replace(/[{}]/g, '');

        // create file

        fs.writeFileSync(filePath_Name, content);
    });
}

// create files
createFilesOfUsers();
