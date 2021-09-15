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

        const value = await OAuth.find({ createdAt: { $lte: date } })
            .populate(USER)
            .lean()
            .cursor();

        await value.eachAsync(async (doc) => {
            await sendMail(
                doc.user.email,
                NOTIFICATION_LATTER,
                { userName: doc.user.name }
            );

            const id = doc.user._id;

            await ActionTokens.deleteMany({ user: id });
            await OAuth.deleteMany({ user: id });
        });

        console.log('ActionModelTokens document in DB was revised; all old tokens was removed');
        console.log('OAuth document in DB was revised; all old tokens was removed');
    } catch (error) {
        console.log(error);
    }
};
