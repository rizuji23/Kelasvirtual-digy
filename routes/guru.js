var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var formidable = require('formidable');
var koneksi = require('../models/connect');
var fs = require('fs')

router.get('/', function (req, res, next) {
    res.render('guru/index.ejs');
});

router.get('/jadwal', function (req, res, next) {
    if (req.session.loggedin2) {
        koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [req.session.id_guru], function (err, result, fields) {
            if (err) throw err;
            res.render('guru/jadwal.ejs', {
                id_guru: req.session.id_guru,
                nama_guru: req.session.nama_guru,
                ids: req.session.ids,
            });
        });

    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/guru');
    }
});

router.post('/getmapel/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("SELECT * FROM mapel WHERE id_guru = ?", [ids], function (err, result, fields) {
        res.send({
            'data_mapel': result
        });
    });

});

router.get('/buatjadwal', function (req, res, next) {
    // if (req.session.loggedin2) {
    //     koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [req.session.id_guru], function (err, result, fields) {
    //         if (err) throw err;
    //         res.render('guru/buatjadwal.ejs', {
    //             id_guru: req.session.id_guru,
    //             nama_guru: req.session.nama_guru,
    //             ids: req.session.ids,
    //         });
    //     });

    // } else {
    //     req.flash('error', 'Silahkan login terlebih dahulu');
    //     res.redirect('/guru');
    // }

    res.render('guru/buatjadwal.ejs');
});

router.post('/getkelas/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("SELECT * FROM kelas_guru WHERE id_guru = ?", [ids], function (err, result, fields) {
        res.send({
            'data_kelas': result
        });
    });
})

router.post('/authguru', function (req, res, next) {
    var id_guru = req.body.id_guru;
    var password = req.body.password;

    if (id_guru === "" || password === "") {
        req.flash('error', "ID Guru dan password harus diisi!!");
        res.redirect('/admin');
    } else {

        koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [id_guru], function (err, rows, fields) {
            if (err) throw err;

            if (rows.length <= 0) {
                req.flash('error', "ID Guru atau password salah!!");
                res.redirect('/guru');
            } else {
                // req.session.loggedin = true;
                // req.session.username = username;
                // res.redirect('/admin/dashboard');
                bcrypt.compare(password, rows[0].password, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        req.session.loggedin2 = true;
                        req.session.id_guru = id_guru;
                        req.session.ids = rows[0].id_gurus;
                        req.session.nama_guru = rows[0].nama_guru;
                        res.redirect('/guru/jadwal');
                    } else {
                        req.flash('error', "Username atau password salah!!");
                        res.redirect('/guru');
                    }
                })
            }
        });
    }
});

router.post('/addpertemuan', function (req, res, next) {
    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./public/assets/img/thumbnail/"; //set upload directory
    form.keepExtensions = true; //keep file extension

    form.parse(req, function (err, fields, files) {
        res.write('received upload:\n\n');

        fs.rename(files.thumbnail_file.path, './public/assets/img/thumbnail/' + files.thumbnail_file.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });

        fs.rename(files.materi_file.path, './dokumen/materi/' + files.materi_file.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });
        res.end();
    });
});

module.exports = router;