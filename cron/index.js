const cron = require('node-cron');
const dayJs = require('dayjs');
const utsPlugin = require('dayjs/plugin/utc');

const notifyUserAndRemoveOldTokens = require('./notifyUser.removeOldTokens');
const removeInvalidTokens = require('./removeInvalidTokens');

const {
    variables: {
        DeleteActionTokens,
        DeleteOAuthTokens,
        Month_period,
        Week_period,
        Weekly_Schedule_CleanUp_Tokens,
        Weekly_Schedule_User_Notification,
    }
} = require('../config');

dayJs.extend(utsPlugin);

module.exports = () => {
    cron.schedule(Weekly_Schedule_User_Notification, async () => {
        try {
            console.log('The weekly scheduled task is started at ', new Date().toISOString());

            await notifyUserAndRemoveOldTokens();

            console.log('The weekly scheduled task was completed at ', new Date().toISOString());
        } catch (error) {
            console.log(error);
        }
    }, {});

    cron.schedule(Weekly_Schedule_CleanUp_Tokens, async () => {
        try {
            console.log('Everyday scheduled task is started at ', new Date().toISOString());

            await removeInvalidTokens(Month_period, DeleteOAuthTokens);

            await removeInvalidTokens(Week_period, DeleteActionTokens);

            console.log('Everyday scheduled task was completed at ', new Date().toISOString());
        } catch (error) {
            console.log(error);
        }
    }, {});
};
