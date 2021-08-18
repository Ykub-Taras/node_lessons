// ************ Part 2 *****************

const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

// --------------------------------structuring files in one folder
fs.readdir('./', {withFileTypes: true}, (error, files) => {
    // reading list of directories
    if (error) throw error;
    const directoriesInDirectory = files
        .filter((item) => {if (!item.name.includes(".") && item.isDirectory()) {return item}
        })
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

