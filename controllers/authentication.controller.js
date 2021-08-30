const passwordService = require('../services/password.service');

const authenticationController = {
    userLogin: async (req, res, next) => {
        try {
            const { password } = req.body;

            const { user } = req;

            const temp = JSON.stringify(user._id);

            const user_id = JSON.parse(temp);

            await passwordService.matchPassword(password, user.password);

            res.redirect(`users/${user_id}`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authenticationController;
