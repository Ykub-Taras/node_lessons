const { passwordService: { matchPassword } } = require('../services');

const authenticationController = {
    userLogin: async (req, res, next) => {
        try {
            const {
                body: { password },
                user
            } = req;
            const user_id = JSON.parse(JSON.stringify(user._id));

            await matchPassword(password, user.password);

            res.redirect(`users/${user_id}`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authenticationController;
