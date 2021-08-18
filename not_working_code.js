// temporary file for code testing

const fs = require('fs');
const path = require('path');
const util = require('util');
const appDir = path.dirname(require.main.filename);

const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]


function createFilesOfUsers() {
    users.forEach(user => {
            const filePath_Name = path.join(__dirname, `${user.gender === 'male' ? 'man' : 'woman'}${user.age < 20 ? 'Older20' : 'Younger20'}`, `${user.name}.txt`);
            let content = JSON.stringify(user).replace(/[{}]/g, '');
             // create file
            fs.writeFileSync(filePath_Name, content, err => {
                console.log("*****  creating file error:", err)
            })
        }
    )}

// create files
createFilesOfUsers()


// const fs = require('fs');
// const path = require('path');
// const util = require("util");
//
// const createFolder1 = path.join(__dirname, '18.00');
// const createFolder2 = path.join(__dirname, '20.00');
//
// // create folders
// fs.mkdir(createFolder1, {recursive: true}, err => {
//     console.log(err)
// });
// fs.mkdir(createFolder2, {recursive: true}, err => {
//     console.log(err)
// });
//
// // create NickName
//
// async function createName(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() *
//             charactersLength));
//     }
//     return result;
// }
//
// console.log(createName(5));
//
// // generate gender
// async function createGender() {
//     let gender = Math.random();
//     gender < 0.5 ? gender = 'male' : gender = 'female';
//     return gender
// }
//
// console.log(createGender());
//
//
// // initial settling in folders
// async function setInitialFolder() {
//     let initialFolder = Math.random();
//     initialFolder < 0.5 ? initialFolder = '18.00' : initialFolder = '20.00'
//     return initialFolder
// }
//
// console.log(setInitialFolder())
//
// const nickName1 = util.promisify(createName)
// const gender1= util.promisify(createGender)
// const folder1= util.promisify(setInitialFolder)
//
// async function createFile  () {
//
//         let filePath_Name =''
//         const folder = await folder1().then(value => filePath_Name=path.join(__dirname, value.toString()));
//         const nickName = await  nickName1().then(value => filePath_Name=path.join(filePath_Name, value));
//         const gender = await  gender1();
//         console.log(filePath_Name, folder, '------------------------log---')
//         const content = `{Name: '${nickName}', gender: '${gender}'}`;
//        await fs.writeFile(filePath_Name, content, err => {
//             console.log(err)})
//
//   }
//
// // for (let i = 0; i < 20; i++) {
// //     createFile();
// // }
//
//     createFile();
//
//
// // import fs from "fs";
// // import path from "path";
// // import { fileURLToPath } from 'url';
// // import { dirname } from 'path';
// //
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);
// //
