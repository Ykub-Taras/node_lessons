const {
    emailActionsEnum: {
        DELETED_BY_ADMIN,
        DELETED_BY_USER,
        USER_AUTHORIZED,
        USER_CREATED,
        USER_UPDATED
    }
} = require('../config');

module.exports = {
    [DELETED_BY_ADMIN]: {
        templateName: 'deletedByAdmin',
        subject: 'Your account was deleted by sysadmin!'
    },

    [DELETED_BY_USER]: {
        templateName: 'deletedByUser',
        subject: 'Your account was deleted'
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
    },

};
