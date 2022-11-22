const nodemailer = require("nodemailer");

module.exports = async (option) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: "25",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    
    const mailOptions = {
        from: option.email,
        to: process.env.EMAIL,
        subject: "From website",
        text: `name: ${option.name}, phone: ${option.phone}, adress: ${option.adress}, electric bill: ${option.electricBill}, electric company: ${option.electricCompany}, do you own your home : ${option.homeStatus}, credit score: ${option.creditScore}`
    };
    await transporter.sendMail(mailOptions);
}