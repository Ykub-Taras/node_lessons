const fs = require('fs');
const path = require('path');
const util = require("util");

const createFolder1 = path.join(__dirname, '18.00');
const createFolder2 = path.join(__dirname, '20.00');

// create folders
fs.mkdir(createFolder1, {recursive: true}, err => {
    console.log(err)
});
fs.mkdir(createFolder2, {recursive: true}, err => {
    console.log(err)
});

// create NickName

async function createName(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

console.log(createName(5));

// generate gender
async function createGender() {
    let gender = Math.random();
    gender < 0.5 ? gender = 'male' : gender = 'female';
    return gender
}

console.log(createGender());


// initial settling in folders
async function setInitialFolder() {
    let initialFolder = Math.random();
    initialFolder < 0.5 ? initialFolder = '18.00' : initialFolder = '20.00'
    return initialFolder
}

console.log(setInitialFolder())

const nickName1 = util.promisify(createName)
const gender1= util.promisify(createGender)
const folder1= util.promisify(setInitialFolder)

async function createFile  () {

        let filePath_Name =''
        const folder = await folder1().then(value => filePath_Name=path.join(__dirname, value.toString()));
        const nickName = await  nickName1().then(value => filePath_Name=path.join(filePath_Name, value));
        const gender = await  gender1();
        console.log(filePath_Name, folder, '------------------------log---')
        const content = `{Name: '${nickName}', gender: '${gender}'}`;
       await fs.writeFile(filePath_Name, content, err => {
            console.log(err)})

  }

// for (let i = 0; i < 20; i++) {
//     createFile();
// }

    createFile();


// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
