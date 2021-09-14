const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('59 23 * * 1', () => {
        console.log(`Cron start at ${new Date().toISOString()}`);
        removeOldTokens();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });
};
