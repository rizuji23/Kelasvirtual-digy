var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var koneksi = require('../models/connect');

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
    res.render('guru/buatjadwal.ejs');
});

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

module.exports = router;