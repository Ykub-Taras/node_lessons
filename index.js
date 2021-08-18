// ********** HomeWork 01 **************
// ************ Part 1 *****************
// sorting files
// -- через помилки при асинхронній роботі не використовував callback
// -- код запускав логічними частинами

const fs = require('fs');
const path = require('path');
const util = require('util');
const appDir = path.dirname(require.main.filename);
console.log(appDir);

const createFolder1 = path.join(__dirname, '18.00');
const createFolder2 = path.join(__dirname, '20.00');
const targetFolder = path.join(__dirname, 'targetFolder');

// -------------------------------- create folders
fs.mkdir(createFolder1, {recursive:true}, err => {
    console.log(err)});
fs.mkdir(createFolder2, {recursive:true}, err => {
    console.log(err)});
fs.mkdir(targetFolder, {recursive:true}, err => {
    console.log(err)});

// -------------------------------- randomly creating files
function createFile  (length) {
        // create NickName
        let nickName = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        nickName += characters.charAt(Math.floor(Math.random() *
            charactersLength));}
        // generate gender
    let gender = Math.random();
    gender < 0.5 ? gender = 'male' : gender = 'female';
        // initial settling in folders
    let initialFolder = Math.random();
    initialFolder < 0.5 ? initialFolder = '18.00' : initialFolder = '20.00'
        // create file
    const filePath_Name = path.join(__dirname, initialFolder.toString(), `${nickName}.txt`);
    const content = `{Name: '${nickName}', gender: '${gender}'}`;
    fs.writeFileSync(filePath_Name, content, err => {
        console.log("*****  creating file error:", err)
    })
}

for (let i = 0; i < 100; i++) {createFile(5)}


// -------------------------------- sorting files
fs.readdir('./', { withFileTypes: true }, (error, files) => {
    // reading list of directories
    if (error) throw error;
    const directoriesInDirectory = files
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    // reading list of files
    directoriesInDirectory.forEach(dir =>
        fs.readdir(path.join(__dirname, dir), (err, files) => {
            files.forEach(file => {
                // reading file content
                fs.readFile(path.join(dir, file), function (err, data) {
                    if (err) throw err;
                    if(data.includes('gender: \'male\'')){
                        // moving files to specified directories
                        fs.rename(path.join(dir, file), path.join(dir,'..','20.00', file), err1 => {
                            // console.log(err1)
                        }
                        )
                    }
                });
            });
        })
    )
})

// ************ Part 2 *****************

// --------------------------------structuring files in one folder
fs.readdir('./', {withFileTypes: true}, (error, files) => {
    // reading list of directories
    if (error) throw error;
    const directoriesInDirectory = files
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    // reading list of files
    directoriesInDirectory.forEach(dir =>
        fs.readdir(path.join(__dirname, dir), (err, files) => {
            files.forEach(file => {
                // moving file
                fs.rename(path.join(dir, file), path.join(appDir, 'targetFolder', file), err1 => {
                    // console.log(err1)
                    }
                )
            });
        })
    )
})



// ********** Practical class 01 **************
// in progress
