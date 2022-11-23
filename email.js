const nodemailer = require("nodemailer");

module.exports = async (option) => {
    let transporter = nodemailer.createTransport({
        // host: "smtp.mailgun.org",
        // port: "25",
        service: 'Sendinblue',
        auth: {
            user:'saadirania406@gmail.com',
            pass: 'Everlasting1680'
        }
    });
    
    
    const mailOptions = {
        from: option.email,
        to: 'saadirania33@gmail.com',
        subject: "From website",
        text: `name: ${option.name}, phone: ${option.phone}, adress: ${option.adress}, electric bill: ${option.electricBill}, electric company: ${option.electricCompany}, do you own your home : ${option.homeStatus}, credit score: ${option.creditScore}`
    };
    await transporter.sendMail(mailOptions);
}


