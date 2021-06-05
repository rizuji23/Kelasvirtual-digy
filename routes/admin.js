var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var koneksi = require('../models/connect');
var shortid = require('shortid');
var sprintf = require('sprintf-js').sprintf;
var transport = require('../models/email');
var formidable = require('formidable');
var fs = require('fs');

const {
    route,
    use
} = require('.');
const {
    readSync
} = require('node:fs');

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
    var paket = req.body.paket;


    koneksi.query("INSERT INTO siswa (id_sis, nama, email, password, no_wa, jenjang, kelas, paket, dir_image, tanggal, tanggal_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_sis, namasiswa, email, password, no_wa, jenjang, kelas, paket, "default.jpg", tanggal, tanggal]);

    koneksi.query("SELECT max(id) as maxid FROM siswa", function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].maxid);
        var id = result[0].maxid;
        id++;
        var huruf = "digy";
        var idsiswa = huruf + sprintf("%03s", id);
        koneksi.query("UPDATE siswa SET id_siswa = ? WHERE id_sis = ?", [idsiswa, id_sis], function (err, result, fields) {
            if (err) throw err;
            var message = {
                from: 'rizkiuji4@gmail.com',
                to: email,
                subject: 'Selamat ' + namasiswa + ' kamu sudah terdaftar di Digy homeschooling',
                html: `<h2>Selamat akun kamu sudah di daftarkan di Digy homeschooling Zoom Class sebagai Siswa</h2>
                <p>Informasi Akun : </p>
                <ul>
                    <li>Nama : ` + namasiswa + ` </li>
                    <li>Email : ` + email + ` </li>
                    <li>Nomor WhatsApp : ` + no_wa + ` </li>
                    <li>Kelas : ` + jenjang + ` ` + kelas + ` </li>
                    <li>Paket : ` + paket + ` </li>
                    <li>ID Siswa : ` + idsiswa + ` </li>
                    <li>Password : sukses1234 </li>
                </ul>
                
                <small>Dibuat pada tanggal ` + tanggal + ` : (Digy homeschooling)</small>`
            }

            transport.sendMail(message, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash('success', 'Sudah ditambah...');
                    res.redirect('/admin/tambahsiswa');
                    console.log(info)
                }
            })


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
    var mapel = ['uji', 'uji123'];
    var idguru = 'dawda';
    var tanggal = 'dawd';
    for (var i = 0; i < mapel.length; i++) {
        koneksi.query("INSERT INTO mapel VALUES(NULL, ?, ?, ?, ?)", [idguru, mapel[i], tanggal, tanggal], function (err, result, fields) {
            if (err) throw err;
        });
    }

    res.send('done');

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

router.get('/tambahguru', function (req, res, next) {
    res.render('admin/tambahguru.ejs')
});

router.post('/addguru', function (req, res, next) {

    res.setHeader("Content-Type", "text/html");

    var form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        var namaguru = fields.namaguru;
        var email = fields.email;
        var password = bcrypt.hashSync('sukses1234', 10);
        var no_wa = fields.no_wa;
        var jenjang = fields.jenjang;
        var kelas = fields.kelas;
        var mapel = fields.mapel
        var tanggal = new Date();
        var id_gurus = shortid.generate();

        fs.rename(files.foto_guru.path, './public/assets/img/foto_guru/' + files.foto_guru.name, function (err) {
            if (err) throw err;
            console.log('renamed complate');
        });

        koneksi.query("INSERT INTO guru (id_gurus, nama_guru, email, password, no_wa, dir_image, tanggal, tanggal_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id_gurus, namaguru, email, password, no_wa, files.foto_guru.name, tanggal, tanggal], function (err, result, fields) {
            if (err) throw err;

            koneksi.query("SELECT max(id) as maxid FROM guru", function (err, result, fields) {
                if (err) throw err;
                console.log(result[0].maxid);
                var id = result[0].maxid;
                id++;
                var huruf = "digyguru";
                var idguru = huruf + sprintf("%03s", id);
                koneksi.query("UPDATE guru SET id_guru = ? WHERE id_gurus = ?", [idguru, id_gurus], function (err, result, fields) {
                    if (err) throw err;
                    for (var i = 0; i < mapel.length; i++) {
                        koneksi.query("INSERT INTO mapel VALUES(NULL, ?, ?, ?, ?)", [id_gurus, mapel[i], tanggal, tanggal], function (err, result, fields) {
                            if (err) throw err;
                        });
                    }

                    for (var i = 0; i < kelas.length; i++) {
                        koneksi.query("INSERT INTO kelas_guru VALUES(NULL, ?, ?, ?, ?, ?)", [id_gurus, jenjang[i], kelas[i], tanggal, tanggal], function (err, result, fields) {
                            if (err) throw err;

                        });
                    }

                    var message = {
                        from: 'rizkiuji4@gmail.com',
                        to: email,
                        subject: 'Selamat ' + namaguru + ' kamu sudah terdaftar di Digy homeschooling',
                        html: `<h2>Selamat akun kamu sudah di daftarkan di Digy homeschooling Zoom Class sebagai Guru</h2>
                        <p>Informasi Akun : </p>
                        <ul>
                            <li>Nama : ` + namaguru + ` </li>
                            <li>Email : ` + email + ` </li>
                            <li>Nomor WhatsApp : ` + no_wa + ` </li>
                            <li>Kelas : (` + jenjang.toString() + `) (` + kelas.toString() + `) </li>
                            <li>ID Guru : ` + idguru + ` </li>
                            <li>Password : sukses1234 </li>
                        </ul>
                        
                        <small>Dibuat pada tanggal ` + tanggal + ` : (Digy homeschooling)</small>`
                    }

                    transport.sendMail(message, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            req.flash('success', 'Sudah ditambah...');
                            res.redirect('/admin/tambahguru');
                            console.log(info)
                        }
                    })


                });
            });
        });
    })




});

router.get('/fetchguru', function (req, res, next) {
    koneksi.query("SELECT * FROM guru", function (err, result) {
        if (err) throw err;
        res.send({
            'result': result
        })
    });
});

router.get('/editguru/:id_gurus', function (req, res, next) {
    var id = req.params.id_gurus;

    koneksi.query("SELECT * FROM guru WHERE id_gurus = ?", [id], function (err, result, fields) {
        if (err) throw err;
        res.render('admin/editguru.ejs', {
            'result': result,
        });
    });
});

router.post('/editguruprosses', function (req, res, next) {
    var namaguru = req.body.namaguru;
    var email = req.body.email;
    var no_wa = req.body.no_wa;
    var jenjang = req.body.jenjang;
    var kelas = req.body.kelas;
    var mapel = req.body.mapel
    var tanggal = new Date();
    var id_gurus = req.body.id_gurus;

    koneksi.query("UPDATE guru SET nama_guru = ?, email = ?, no_wa = ?, jenjang = ?, kelas = ?, mapel = ?, tanggal_update = ? WHERE id_gurus = ?", [namaguru, email, no_wa, jenjang, kelas, mapel, tanggal, id_gurus], function (err, result, fields) {
        if (err) throw err;
        req.flash('success', 'Sudah diedit...');
        res.redirect('/admin/lihatguru');
    });
});

router.get('/hapusguru/:id_gurus', function (req, res, next) {
    var id = req.params.id_gurus;

    koneksi.query("DELETE FROM guru WHERE id_gurus = ?", [id], function (err, result, fields) {
        if (err) throw err;
        req.flash('success', 'Sudah dihapus...');
        res.redirect('/admin/lihatguru');
    });
});

router.post('/detailguru/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("SELECT * FROM mapel WHERE id_guru = ?", [ids], function (err, result, fields) {
        res.send({
            'data': result
        });
    });

});


router.post('/detailguru2/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("SELECT * FROM kelas_guru WHERE id_guru = ?", [ids], function (err, result, fields) {
        res.send({
            'data2': result
        });
    });

});


module.exports = router;