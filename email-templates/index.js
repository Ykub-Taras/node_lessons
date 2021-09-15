const {
    emailActionsEnum: {
        ACTIVATION_BY_EMAIL,
        ADMIN_CREATED,
        CHANGE_PASS,
        DELETED_BY_ADMIN,
        DELETED_BY_USER,
        FORGOT_PASS,
        NOTIFICATION_LATTER,
        USER_AUTHORIZED,
        USER_CREATED,
        USER_UPDATED,
    }
} = require('../config');

module.exports = {
    [ADMIN_CREATED]: {
        templateName: 'adminCreated',
        subject: 'Please, change your password!'
    },

    [ACTIVATION_BY_EMAIL]: {
        templateName: 'activationByEmail',
        subject: 'Please, activate your account!'
    },

    [CHANGE_PASS]: {
        templateName: 'changePass',
        subject: 'Password resetting!'
    },

    [DELETED_BY_ADMIN]: {
        templateName: 'deletedByAdmin',
        subject: 'Your account was deleted by sysadmin!'
    },

    [DELETED_BY_USER]: {
        templateName: 'deletedByUser',
        subject: 'Your account was deleted'
    },

    [FORGOT_PASS]: {
        templateName: 'forgotPass',
        subject: 'Password resetting!'
    },

    [NOTIFICATION_LATTER]: {
        templateName: 'notification-letter',
        subject: 'You was logged out from OWU.com on all your devices!'
    },

    [USER_AUTHORIZED]: {
        templateName: 'login',
        subject: 'Authorization was successful!'
    },

    [USER_CREATED]: {
        templateName: 'userCreated',
        subject: 'Account was created!'
    },

    [USER_UPDATED]: {
        templateName: 'userUpdated',
        subject: 'Account was updated!'
    }

};
