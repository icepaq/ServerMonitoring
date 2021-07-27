const nodemailer = require("nodemailer");

module.exports = class Email {
    async send(to, code) {

        let message = 
            'You recently requested to change your password. If you did not do this, you may disregard this email. This code will expire in 5 minutes.\n' +
            'Your code is: ' + code;

        let html = '<p>You recently requested to change your password. If you did not do this, you may disregard this email. This code will expire in 5 minutes.</p><br/>' +
            '<p>Your code is: </p> <h2>' + code + '</h2>';
        
        console.log('Email: ' + message);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.porkbun.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            tls: { rejectUnauthorized: false },
            auth: {
                user: "no-reply@controlserverhosting.com",
                pass: "",
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "CTRL Hosting <no-reply@controlserverhosting.com>", // sender address
            to: to, // list of receivers
            subject: 'Your Password Reset Code', // Subject line
            text: message, // plain text body
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
};
