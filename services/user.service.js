const fs = require('fs');
const util = require('util');

const readFileFsPromisify = util.promisify(fs.readFile);
const writeFileFsPromisify = util.promisify(fs.writeFile);

module.exports = {
    getUsersFromFile: async (pathUsers) => {
        const usersData = await readFileFsPromisify(pathUsers);

        return JSON.parse(usersData.toString());
    },

    writeUsersInFile: async (pathUsers, users) => {
        await writeFileFsPromisify(pathUsers, JSON.stringify(users));
    }
};
