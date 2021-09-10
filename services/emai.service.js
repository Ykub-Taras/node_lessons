const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    statusCodes: { SERVER_ERROR },
    statusMessages: { WRONG_TEMPLATE },
    variables: {
        EMAIL_SANDER,
        FRONTEND_URL,
        PASSWORD_EMAIL_SANDER
    }
} = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_SANDER,
        pass: PASSWORD_EMAIL_SANDER
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
// context = { userName: 'client', frontendURL: FRONTEND_URL })
    if (!context.userName) context.userName = 'client';
    if (!context.frontendURL) context.frontendURL = FRONTEND_URL;

    const templateInst = allTemplates[emailAction];
    if (!templateInst) throw new ErrorHandler(SERVER_ERROR, WRONG_TEMPLATE);

    const {
        subject,
        templateName
    } = templateInst;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = { sendMail };
