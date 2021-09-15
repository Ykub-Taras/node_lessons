const cron = require('node-cron');
const dayJs = require('dayjs');
const utsPlugin = require('dayjs/plugin/utc');

const notifyUserAndRemoveOldTokens = require('./notifyUser.removeOldTokens');
const { variables: { Weekly_Schedule } } = require('../config');

dayJs.extend(utsPlugin);

module.exports = () => {
    cron.schedule(Weekly_Schedule, async () => {
        try {
            console.log('The weekly scheduled task is started at ', new Date().toISOString());

            await notifyUserAndRemoveOldTokens();

            console.log('The weekly scheduled task was completed at ', new Date().toISOString());
        } catch (error) {
            console.log(error);
        }
    }, {});
};

// '30 6 * * mon,wed,fri' - is crone alternative record
