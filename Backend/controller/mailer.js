const nodemailer = require("nodemailer")
const whitelist = require("./cors")

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const verifyMail = (mail, token) =>{
    const url = `${process.env.FRONTEND_URL}/verify-email/${token}`
    transport.sendMail({
        to: mail,
        subject: "Verify your email address",
        html: `
            <h1>Verify your email address</h1>
            <p>Click on the following link to verify your email:</p>
            <a href="${url}">Verify email</a>`
    })

    console.log(`email sent to ${url}`)
}

module.exports = verifyMail