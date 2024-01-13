const nodemailer = require('nodemailer');

module.exports.SendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: "smtp.forwardemail.net",
            service: "gmail",
            // port: 465,
            // secure: true,
            auth: {
                user: "anshgarg94161@gmail.com",
                pass: "zeaf hanl ffjm ukpo",
            },
            authMethod: "PLAIN"
        });
        await transporter.sendMail({
            from: "anshgarg94161@gmail.com",
            to: email,
            subject: subject,
            text: text,
        })
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
}