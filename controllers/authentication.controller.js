const passwordService = require('../services/password.service');

const authenticationController = {
    userLogin: async (req, res, next) => {
        try {
            const { password } = req.body;

            const { user } = req;

            await passwordService.matchPassword(password, user.password);

            res.redirect(`/users/${user._id}`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authenticationController;
