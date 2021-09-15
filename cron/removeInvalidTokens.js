const dayJs = require('dayjs');
const utsPlugin = require('dayjs/plugin/utc');

dayJs.extend(utsPlugin);

const {
    usersRoleENUM: { USER },
} = require('../config');
const {
    ActionTokens,
    OAuth,
} = require('../dataBase');

module.exports = async (period, typeOfClean, baseType) => {
    try {
        const date = dayJs.utc()
            .subtract(1, period)
            .toISOString();

        const value = await baseType.find({ createdAt: { $lte: date } })
            .populate(USER)
            .lean()
            .cursor();

        await value.eachAsync(async (doc) => {
            const id = doc.user._id;

            switch (typeOfClean) {
                case 'ActionTokensDelete':
                    await ActionTokens.deleteMany({ user: id });
                    console.log('ActionModelTokens document in DB was revised; all old tokens was removed');
                    break;
                case 'OAuthTokensDelete':
                    await OAuth.deleteMany({ user: id });
                    console.log('OAuth document in DB was revised; all old tokens was removed');
                    break;
                default:
                    console.log('No such option to cleanup');
            }
        });
    } catch (error) {
        console.log(error);
    }
};
