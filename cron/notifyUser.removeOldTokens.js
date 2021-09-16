const dayJs = require('dayjs');
const utsPlugin = require('dayjs/plugin/utc');

dayJs.extend(utsPlugin);

const {
    emailActionsEnum: { NOTIFICATION_LATTER },
    usersRoleENUM: { USER },
} = require('../config');
const {
    ActionTokens,
    OAuth,
} = require('../dataBase');
const { emailService: { sendMail } } = require('../services');

module.exports = async (period) => {
    try {
        const date = dayJs.utc()
            .subtract(1, period)
            .toISOString();

        const foundedUsers = await OAuth.find({ createdAt: { $lte: date } })
            .populate(USER);

        await Promise.all(foundedUsers.map(async (value) => {
            await sendMail(
                value.user.email,
                NOTIFICATION_LATTER,
                { userName: value.user.name }
            );

            const { _id } = value.user;

            await ActionTokens.deleteMany({ user: _id });

            await OAuth.deleteMany({ user: _id });
        }));

        console.log('ActionModelTokens document in DB was revised; all old tokens was removed');
        console.log('OAuth document in DB was revised; all old tokens was removed');
    } catch (error) {
        console.log(error);
    }
};

// ----------- Alternative option: -----------------------

// const value = await OAuth.find({ createdAt: { $lte: date } })
//     .populate(USER)
//     .lean()
//     .cursor();
//
// await value.eachAsync(async (doc) => {
//     await sendMail(
//         doc.user.email,
//         NOTIFICATION_LATTER,
//         { userName: doc.user.name }
//     );
//
// const { _id } = value.user;
//
// await ActionTokens.deleteMany({ user: _id });
// await OAuth.deleteMany({ user: _id });
// });
