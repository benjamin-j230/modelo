const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email_user,
        pass: process.env.email_password
    }
});

const sendEmail = async (to, subject, text) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    });

};

module.exports = sendEmail;