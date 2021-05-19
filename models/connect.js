var mysql = require('mysql');

var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'uji',
    password: 'uji123',
    database: 'digyhomeschooling'
});

koneksi.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log("Connected!");
    }
});

module.exports = koneksi;