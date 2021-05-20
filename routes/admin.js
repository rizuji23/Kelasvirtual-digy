var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs-extra');
var cookieSession = require('cookie-session');
var bcrypt = require('bcrypt');
var koneksi = require('../models/connect');
var fastcsv = require('fast-csv');

const {
    route,
    use
} = require('.');

router.get('/', function (req, res, next) {
    res.render('admin/index.ejs');
});


router.post('/authadmin', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    koneksi.query("SELECT * FROM admin WHERE username = ? AND password = ?", [username, password], function (err, rows, fields) {
        if (err) throw err;

        if (rows.length <= 0) {
            req.flash('error', "Username atau password salah!!");
            res.redirect('/admin');
        } else {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/admin/dashboard');
        }
    });
});

router.get('/dashboard', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admin/dashboard.ejs', {
            username: req.session.username
        });
    } else {
        req.flash('success', 'Silahkan login terlebih dahulu');
        req.redirect('/admin');
    }
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    req.flash('success', 'Login lagi..');
    res.redirect('/admin');
})

router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./data_siswa";
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        // res.writeHead(200, {
        //     'content-type': 'text/plain'
        // });
        console.log("form.bytesReceived");
        console.log("file size: " + JSON.stringify(files.filecsv.size));
        console.log("file path: " + JSON.stringify(files.filecsv.path));
        console.log("file name: " + JSON.stringify(files.filecsv.name));
        console.log("file type: " + JSON.stringify(files.filecsv.type));
        console.log("astModifiedDate: " + JSON.stringify(files.filecsv.lastModifiedDate));

        fs.rename(files.filecsv.path, './data_siswa/' + files.filecsv.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });

        let stream = fs.createReadStream('./data_siswa/' + files.filecsv.name);

        let csvData = [];
        let csvStream = fastcsv.parse().on("data", function (data) {
            csvData.push(data);
        }).on("end", function () {
            csvData.shift();

            koneksi.query("INSERT INTO siswa (nama, email, password, id_siswa, no_wa, kelas, tanggal) VALUES ?", [csvData]);

            console.log(csvData);
        })
        stream.pipe(csvStream);
        res.end();
    });
    req.flash('success', 'File Sudah Diupload');
    res.redirect('/admin/dashboard');
});

router.get('/testcsv', function (req, res, next) {
    let stream = fs.createReadStream('./data_siswa/test.csv');
    let csvData = [];
    let csvStream = fastcsv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // remove the first line: header
            csvData.shift();
            console.log(csvData);
        });
    console.log(csvData);
    stream.pipe(csvStream);
})

module.exports = router;