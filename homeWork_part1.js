// ********** HomeWork 01 **************

// ************ Part 1 *****************

// ----     sorting files   ----

const fs = require('fs');
const path = require('path');

const appDir = path.dirname(require.main.filename);

const createFolder1 = path.join(__dirname, '18_00');
const createFolder2 = path.join(__dirname, '20_00');

// -------------------------------- creating folders
fs.mkdirSync(createFolder1, { recursive: true });
fs.mkdirSync(createFolder2, { recursive: true });

// -------------------------------- randomly creating files
function createFile(length) {
    // create NickName

    let nickName = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        nickName += characters.charAt(Math.floor(Math.random()
            * charactersLength));
    }

    // generate gender

    let gender = Math.random();
    gender < 0.5 ? gender = 'male' : gender = 'female';

    // initial settling in folders
    let initialFolder = Math.random();
    initialFolder < 0.5 ? initialFolder = '18_00' : initialFolder = '20_00';

    // create file
    const filePath_Name = path.join(__dirname, initialFolder.toString(), `${nickName}_${gender}.txt`);

    const content = `{Name: '${nickName}', gender: '${gender}'}`;

    fs.writeFileSync(filePath_Name, content, (err) => {
        console.log('*****  creating file error:', err);
    });
}

// - - - - -

function shiftFile(pathDir, file, folder) {
    fs.renameSync(path.join(pathDir, file), path.join(appDir, folder, file));
}

// -------------------------------- sorting files

const folder18 = '18_00';
const folder20 = '20_00';

function sortFiles() {
    // reading list of directories & filtering it
    const directoriesInDirectory = fs.readdirSync(appDir, { withFileTypes: true });

    const filteredListOfDir = directoriesInDirectory
        .filter((item) => item.name.includes(folder18)
            && item.name.includes(folder20)
            && item.isDirectory())
        .map((item) => item.name);

    // reading files in folders
    filteredListOfDir.forEach((dir) => fs.readdir(path.join(__dirname, dir), (error, files) => {
        if (error) {
            console.log(error);
            return;
        }

        files.forEach((file) => {
            // reading file content & searching triggers
            fs.readFile(path.join(dir, file), 'utf8', (e, data) => {
                if (e) {
                    console.log(typeof data);
                    return;
                }

                if (data.includes('female')) {
                    return shiftFile(dir, file, folder18);
                }

                if (data.includes('male')) {
                    return shiftFile(dir, file, folder20);
                }
            });
        });
    }));
}

for (let i = 0; i < 10; i++) {
    createFile(5);
}

sortFiles();

// const filteredListOfDir = directoriesInDirectory
//     .filter((item) => !item.name.includes('.')
//         && !item.name.includes('node_modules')
//         && item.isDirectory())
//     .map((item) => item.name);
