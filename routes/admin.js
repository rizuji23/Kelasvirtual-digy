var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var koneksi = require('../models/connect');
var shortid = require('shortid');
var sprintf = require('sprintf-js').sprintf;

const {
    route,
    use
} = require('.');

router.get('/', function (req, res, next) {
    res.render('admin/index.ejs');
});

router.get('/dashboard', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admin/dashboard.ejs', {
            username: req.session.username,
        });

    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/admin');
    }
});

router.get('/tambahsiswa', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admin/tambahsiswa.ejs', {
            username: req.session.username
        });
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/admin');
    }
});

router.get('/tambahadmin', function (req, res, next) {
    // if (req.session.loggedin) {

    // } else {
    //     req.flash('success', 'Silahkan login terlebih dahulu');
    //     req.redirect('/admin');
    // }

    res.render('admin/tambahadmin.ejs', {
        username: req.session.username
    });
});

router.get('/lihatadmin', function (req, res, next) {
    // if (req.session.loggedin) {

    // } else {
    //     req.flash('success', 'Silahkan login terlebih dahulu');
    //     req.redirect('/admin');
    // }

    res.render('admin/lihatadmin.ejs', {
        username: req.session.username
    });
});

router.post('/addadmin', function (req, res, next) {
    var nama_admin = req.body.nama_admin;
    var username = req.body.username;
    var password = bcrypt.hashSync(req.body.password, 10);
    var tanggal = new Date();

    koneksi.query("INSERT INTO admin VALUES(NULL,?, ?, ?, 1, ?, ?)", [nama_admin, username, password, tanggal, tanggal], function (err, result, fields) {
        if (err) throw err;
        req.flash('success', 'Berhasil ditambah...');
        res.redirect('/admin/tambahsiswa');
    });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    req.flash('success', 'Login lagi..');
    res.redirect('/admin');
});

router.post('/upload', function (req, res, next) {
    var namasiswa = req.body.namasiswa;
    var email = req.body.email;
    var password = bcrypt.hashSync('sukses1234', 10);
    var no_wa = req.body.no_wa;
    var jenjang = req.body.jenjang;
    var kelas = req.body.kelas;
    var tanggal = new Date();
    var id_sis = shortid.generate();

    koneksi.query("INSERT INTO siswa (id_sis,nama, email, password, no_wa, jenjang,kelas, tanggal, tanggal_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_sis, namasiswa, email, password, no_wa, jenjang, kelas, tanggal, tanggal]);

    koneksi.query("SELECT max(id) as maxid FROM siswa", function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].maxid);
        var id = result[0].maxid;
        id++;
        var huruf = "digy";
        var idsiswa = huruf + sprintf("%03s", id);
        koneksi.query("UPDATE siswa SET id_siswa = ? WHERE id_sis = ?", [idsiswa, id_sis], function (err, result, fields) {
            if (err) throw err;
            req.flash('success', 'Sudah ditambah...');
            res.redirect('/admin/tambahsiswa');
        });
    });
});

router.post('/authadmin', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === "" || password === "") {
        req.flash('error', "Username dan password harus diisi!!");
        res.redirect('/admin');
    } else {

        koneksi.query("SELECT * FROM admin WHERE username = ?", [username], function (err, rows, fields) {
            if (err) throw err;

            if (rows.length <= 0) {
                req.flash('error', "Username atau password salah!!");
                res.redirect('/admin');
            } else {
                // req.session.loggedin = true;
                // req.session.username = username;
                // res.redirect('/admin/dashboard');
                bcrypt.compare(password, rows[0].password, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect('/admin/dashboard');
                    } else {
                        req.flash('error', "Username atau password salah!!");
                        res.redirect('/admin');
                    }
                })
            }
        });
    }
});

router.get('/test', function (req, res, next) {
    koneksi.query("SELECT * FROM siswa", function (err, result) {
        if (err) throw err;
        res.send(result)
    });

});

router.get('/fetchsiswa', function (req, res, next) {
    koneksi.query("SELECT * FROM siswa", function (err, result) {
        if (err) throw err;
        res.send({
            'result': result
        })
    });
});

router.get('/fetchadmin', function (req, res, next) {
    koneksi.query("SELECT * FROM admin WHERE level = 1", function (err, result) {
        if (err) throw err;
        res.send({
            'result': result
        })
    });
});

router.get('/edit/:id_sis', function (req, res, next) {
    var id_sis = req.params.id_sis;

    koneksi.query("SELECT * FROM siswa WHERE id_sis = ?", [id_sis], function (err, result, fields) {
        if (err) throw err;
        res.render('admin/editsiswa.ejs', {
            'result': result,
            'data': 'awdawd'
        });
    });
});

router.post('/editproses', function (req, res, next) {
    var namasiswa = req.body.namasiswa;
    var email = req.body.email;
    var no_wa = req.body.no_wa;
    var jenjang = req.body.jenjang;
    var kelas = req.body.kelas;
    var tanggal = new Date();
    var id_sis = req.body.id_sis;

    koneksi.query("UPDATE siswa SET nama = ?, email = ?, no_wa = ?, jenjang = ?, kelas = ?, tanggal_update = ? WHERE id_sis = ?", [namasiswa, email, no_wa, jenjang, kelas, tanggal, id_sis], function (err, result, fields) {
        if (err) throw err;
        req.flash('success', "Edit berhasil...");
        res.redirect('/admin/dashboard');

    });

});

router.get('/hapus/:id_sis', function (req, res, next) {
    var id_sis = req.params.id_sis;
    koneksi.query("DELETE FROM siswa WHERE id_sis = ?", [id_sis], function (err, result, fields) {
        if (err) throw err;

        req.flash('success', "Data dihapus...");
        res.redirect('/admin/dashboard');
    });
});

router.get('/editadmin/:id', function (req, res, next) {
    var id = req.params.id;

    koneksi.query("SELECT * FROM admin WHERE id = ?", [id], function (err, result, fields) {
        if (err) throw err;
        res.render('admin/editadmin.ejs', {
            'result': result,
        });
    });
});

router.post('/editprosesadmin', function (req, res, next) {
    var nama_admin = req.body.nama_admin;
    var username = req.body.username;
    var password = req.body.password;
    var tanggal = new Date();
    var id = req.body.ids;

    if (password === "") {
        koneksi.query("UPDATE admin SET nama_admin = ?, username = ?, tanggal_update = ? WHERE id = ?", [nama_admin, username, tanggal, id], function (err, result, fields) {
            if (err) throw err;
            req.flash('success', "Data diedit...");
            res.redirect('/admin/lihatadmin');
        });
    } else {
        var password2 = bcrypt.hashSync(password, 10);

        koneksi.query("UPDATE admin SET username = ?, password = ?,nama_admin = ?, tanggal_update = ? WHERE id = ?", [username, password2, nama_admin, tanggal, id], function (err, result, fields) {
            if (err) throw err;
            req.flash('success', "Data diedit...");
            res.redirect('/admin/lihatadmin');
        });
    }

});

router.get('/hapusadmin/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("DELETE FROM admin WHERE id = ?", [ids], function (err, result, fields) {
        if (err) throw err;
        req.flash('success', "Data dihapus...");
        res.redirect('/admin/lihatadmin');
    });
});

router.get('/lihatguru', function (req, res, next) {
    res.render('admin/lihatguru.ejs');
});


module.exports = router;