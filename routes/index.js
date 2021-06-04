var express = require('express');
var router = express.Router();
var koneksi = require('../models/connect');
var bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {


    res.render('index.ejs');
});

router.post('/authsiswa', function (req, res, next) {
    var id_siswa = req.body.id_siswa;
    var password = req.body.password;

    if (id_siswa === "" || password === "") {
        req.flash('error', "ID Siswa dan password harus diisi!!");
        res.redirect('/');
    } else {

        koneksi.query("SELECT * FROM siswa WHERE id_siswa = ?", [id_siswa], function (err, rows, fields) {
            if (err) throw err;

            if (rows.length <= 0) {
                req.flash('error', "ID Siswa atau password salah!!");
                res.redirect('/');
            } else {
                // req.session.loggedin = true;
                // req.session.username = username;
                // res.redirect('/admin/dashboard');
                bcrypt.compare(password, rows[0].password, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        req.session.loggedin3 = true;
                        req.session.id_siswa = id_siswa;
                        req.session.ids = rows[0].id_sis;
                        req.session.nama_siswa = rows[0].nama;
                        res.redirect('/jadwal');
                    } else {
                        req.flash('error', "Username atau password salah!!");
                        res.redirect('/');
                    }
                })
            }
        });
    }
})

router.get('/jadwal', function (req, res, next) {
    if (req.session.loggedin3) {
        koneksi.query("SELECT * FROM siswa WHERE id_siswa = ?", [req.session.id_siswa], function (err, result, fields) {
            if (err) throw err;
            res.render('siswa/jadwal.ejs', {
                id_siswa: req.session.id_siswa,
                nama_siswa: req.session.nama_siswa,
                ids: req.session.ids,
                kelas: result[0].kelas,
                jenjang: result[0].jenjang
            });
        });
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/');
    }

});

router.post('/getjadwal/:kelas', function (req, res, next) {
    var kelas = req.params.kelas;
    koneksi.query("SELECT * FROM jadwal_zoom WHERE kelas = ?", [kelas], function (err, result, fields) {
        res.send({
            'data_jadwal': result
        });
    });
})

router.get('/getzoom/:id_zoom', function (req, res, next) {

    var id_zoom = req.params.id_zoom;

    if (req.session.loggedin3) {
        koneksi.query("SELECT s.email, jz.*, zm.* FROM jadwal_zoom AS jz INNER JOIN zoom_meetings AS zm ON jz.id_zoom = zm.id_zoom INNER JOIN siswa AS s WHERE jz.id_zoom = ? AND s.id_sis = ?", [id_zoom, req.session.ids], function (err, result, fields) {
            if (err) throw err;
            res.render('siswa/beforestart.ejs', {
                id_siswa: req.session.id_siswa,
                nama_siswa: req.session.nama_siswa,
                ids: req.session.ids,
                email: result[0].email,
                number_meeting: result[0].id_meeting,
                password: result[0].password,
            });
        })
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/');
    }
});

router.get('/meeting', function (req, res, next) {
    res.render('siswa/meeting.ejs');
})

router.get('/logout', function (req, res, next) {

    req.session.destroy();
    res.redirect('/');

});



module.exports = router;