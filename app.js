const path = require('path');
const util = require('./util');

const ignoreted = ['.idea', '.git', 'app.js', 'util'];

function ignorFileOrDir(fileName) {
    for (const ig of ignoreted) {
        if (fileName === ig) {
            return true;
        }
    }
    return false;
}

function move(pathF, newPathF) {
    util.prom.renameFSPromise(pathF, newPathF).catch(reason => console.log(reason));
}

function gender(pathF) {
    return new Promise((resolve, reject) => {
        util.prom.readFileFSPromise(pathF).then(data => {
            const dataNorm = data.toString().toLowerCase();
            if (dataNorm.includes('female')) resolve('girls');
            if (dataNorm.includes('male')) resolve('boys');
            resolve('');
        }).catch(reason => reject(reason));
    })
}

function stat(pathF) {
    return new Promise((resolve, reject) => {
        util.prom.statFSPromise(pathF).then(stats => {
            resolve(stats.isDirectory());
        }).catch(reason => reject(reason));
    })
}

function moveFilesFromDir(pathDir) {
    util.prom.readDirFSPromise(pathDir).then(async files => {
        try {
            for (const file of files) {
                if (pathDir === __dirname) {
                    if (ignorFileOrDir(file)) continue;
                }

                const pathFile = path.join(pathDir, file);
                if (await stat(pathFile)) {
                    moveFilesFromDir(pathFile);
                } else {
                    const gend = await gender(pathFile);
                    if (gend) {
                        const newPathFile = path.join(__dirname, gend, file);
                        move(pathFile, newPathFile)
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    })
}

moveFilesFromDir(__dirname);

