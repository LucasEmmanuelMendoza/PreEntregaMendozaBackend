const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth:{
        user:'mendozalucas001@gmail.com',
        pass: 'cawpeioqdpuumojh'
    },
})

module.exports = transporter