// ********** HomeWork 01 **************

// ************ Part 2 *****************

// ---moving all files to one folder---

const fs = require('fs');
const path = require('path');

const appDir = path.dirname(require.main.filename);

// -------------------------------- creating folder

const targetFolder = path.join(__dirname, 'targetFolder');

fs.mkdirSync(targetFolder, { recursive: true });

// --------------------------------structuring files in one folder
fs.readdir(appDir, { withFileTypes: true }, (error, files) => {
    if (error) throw error;

    // reading list of directories

    const directoriesInDirectory = files
        .filter((item) => !item.name.includes('.')
            && !item.name.includes('node_modules')
            && item.isDirectory())
        .map((item) => item.name);

    // reading list of files

    directoriesInDirectory.forEach((dir) => fs.readdir(path.join(__dirname, dir), (err, file) => {
        file.forEach((fileName) => {
            // moving file

            fs.renameSync(path.join(dir, fileName), path.join(appDir, 'targetFolder', fileName));
        });
    }));
});
