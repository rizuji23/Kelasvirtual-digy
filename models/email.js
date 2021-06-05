var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    post: '465',
    auth: {
        user: 'rizkiuji4@gmail.com',
        pass: 'rizkifauzi'
    }
});

module.exports = transport;