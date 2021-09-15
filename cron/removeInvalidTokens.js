const dayJs = require('dayjs');
const utsPlugin = require('dayjs/plugin/utc');

dayJs.extend(utsPlugin);

const {
    ActionTokens,
    OAuth,
} = require('../dataBase');

module.exports = async (period, typeOfClean) => {
    try {
        const date = dayJs.utc()
            .subtract(1, period)
            .toISOString();

        switch (typeOfClean) {
            case 'ActionTokensDelete':
                await ActionTokens.deleteMany({ createdAt: { $lte: date } });
                console.log('ActionModelTokens document in DB was revised; all old tokens was removed');
                break;
            case 'OAuthTokensDelete':
                await OAuth.deleteMany({ createdAt: { $lte: date } });
                console.log('OAuth document in DB was revised; all old tokens was removed');
                break;
            default:
                console.log('No such option to cleanup');
        }
    } catch (error) {
        console.log(error);
    }
};
