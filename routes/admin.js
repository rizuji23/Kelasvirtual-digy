var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs-extra');
var cookieSession = require('cookie-session');
var bcrypt = require('bcrypt');
var koneksi = require('../models/connect');

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
    // var fstream;
    // req.pipe(req.busboy);
    // req.busboy.on('file', function (fieldname, file, filename) {
    //     console.log("Uploading: " + filename);

    //     //Path where image will be uploaded
    //     fstream = fs.createWriteStream(__dirname + '/data_siswa/' + filename);
    //     file.pipe(fstream);
    //     fstream.on('close', function () {
    //         console.log("Upload Finished of " + filename);
    //         res.redirect('back'); //where to go next
    //     });
    // });

    var form = new formidable.IncomingForm();
    form.uploadDir = "./data_siswa";
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received upload:\n\n');
        console.log("form.bytesReceived");
        console.log("file size: " + JSON.stringify(files.fileUploaded.size));
        console.log("file path: " + JSON.stringify(files.fileUploaded.path));
        console.log("file name: " + JSON.stringify(files.fileUploaded.name));
        console.log("file type: " + JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));

        fs.rename(files.fileUploaded.path, './data_siswa/' + files.fileUploaded.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });
        res.end();
    });
});
module.exports = router;