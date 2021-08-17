const fs = require('fs');
const util = require('util');

const readDirFSPromise = util.promisify(fs.readdir);
const readFileFSPromise = util.promisify(fs.readFile);
const renameFSPromise = util.promisify(fs.rename);
const statFSPromise = util.promisify(fs.stat);
const writeFileFSPromise = util.promisify(fs.writeFile);
const mkDirFSPromise = util.promisify(fs.mkdir);

module.exports = {
    readDirFSPromise,
    readFileFSPromise,
    renameFSPromise,
    statFSPromise,
    writeFileFSPromise,
    mkDirFSPromise
}