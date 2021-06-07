var express = require('express');
var router = express.Router();
var koneksi = require('../models/connect');
var bcrypt = require('bcrypt');
var fs = require('fs');
var shortid = require('shortid');
var formidable = require('formidable');

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
                jenjang: result[0].jenjang,
                dir_image: result[0].dir_image
            });
        });
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/');
    }

});

router.post('/getjadwal/:kelas', function (req, res, next) {
    var kelas = req.params.kelas;
    koneksi.query("SELECT * FROM jadwal_zoom INNER JOIN guru ON jadwal_zoom.id_guru = guru.id_gurus WHERE kelas = ?", [kelas], function (err, result, fields) {
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
                materi: result[0].materi,
                id_zoom: id_zoom,
                start_url: result[0].start_url
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

router.get('/editprofil', function (req, res, next) {
    if (req.session.loggedin3) {
        koneksi.query("SELECT * FROM siswa WHERE id_siswa = ?", [req.session.id_siswa], function (err, result, fields) {
            if (err) throw err;
            res.render('siswa/edit-profile.ejs', {
                id_siswa: req.session.id_siswa,
                nama_siswa: req.session.nama_siswa,
                ids: req.session.ids,
                dir_image: result[0].dir_image
            });
        });

    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/');
    }
});

router.post('/uploadfoto', function (req, res, next) {
    if (req.session.loggedin3) {
        res.setHeader("Content-Type", "text/html");
        var form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {

            var id_siswa = fields.ids;

            fs.rename(files.fileimg.path, './public/assets/img/foto_siswa/' + files.fileimg.name, function (err) {
                if (err)
                    throw err;
                koneksi.query("UPDATE siswa SET dir_image = ? WHERE id_sis = ?", [files.fileimg.name, id_siswa], function (err, result, fields) {
                    if (err) throw err;
                    req.flash('success', 'Berhasil diupload...');
                    res.redirect('/editprofil');
                })
            });
        });
    } else {
        res.send('Harus Login!!');
    }
})

router.post('/getkelasprofile/:id_sis', function (req, res, next) {
    var id_sis = req.params.id_sis;

    koneksi.query("SELECT * FROM siswa WHERE id_sis = ?", [id_sis], function (err, result, fields) {
        res.send({
            'data_kelas_f': result
        });
    });

});

router.post('/resetpassword', function (req, res, next) {
    var ids = req.body.ids;
    var password_old = req.body.password_old;
    var password_new = req.body.password_new;
    var password_repeat = req.body.password_repeat;

    koneksi.query("SELECT (password) FROM siswa WHERE id_sis = ?", [ids], function (err, result, fields) {
        if (err) throw err;
        bcrypt.compare(password_old, result[0].password, function (err, result2) {
            if (err) throw err;
            if (result2) {
                if (password_repeat === password_new) {
                    var new_pass = bcrypt.hashSync(password_new, 10)
                    koneksi.query("UPDATE siswa SET password = ? WHERE id_sis = ?", [new_pass, ids], function (err, result, fields) {
                        if (err) throw err;
                        req.flash('success', "Password sudah diubah...");
                        res.redirect('/editprofil');
                    })
                }
            } else {
                req.flash('error', "Password dulu tidak cocok!!");
                res.redirect('/editprofil');
            }
        })
    })
})

router.post('/add_data/:id_sis/:id_zoom', function (req, res, next) {
    var id_sis = req.params.id_sis;
    var id_zoom = req.params.id_zoom;
    var tanggal = new Date();
    var id_zoom_in = shortid.generate();

    koneksi.query("INSERT INTO data_zoom_siswa VALUES(NULL, ?, ?, ?, '1', ?, ?)", [id_zoom_in, id_zoom, id_sis, tanggal, tanggal], function (err, result, fields) {
        if (err) throw err;
        res.send(true)
    });
});

module.exports = router;