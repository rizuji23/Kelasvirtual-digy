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
    if (req.session.loggedin) {
        res.render('admin/tambahadmin.ejs', {
            username: req.session.username
        });
    } else {
        req.flash('success', 'Silahkan login terlebih dahulu');
        req.redirect('/admin');
    }

});

router.get('/lihatadmin', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admin/lihatadmin.ejs', {
            username: req.session.username
        });
    } else {
        req.flash('success', 'Silahkan login terlebih dahulu');
        req.redirect('/admin');
    }

});

router.post('/addadmin', function (req, res, next) {
    if (req.session.loggedin) {

    } else {

    }
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
    if (req.session.loggedin) {

    } else {
        res.send('Harus Login!!');
    }
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


router.get('/fetchsiswa', function (req, res, next) {
    if (req.session.loggedin) {
        koneksi.query("SELECT * FROM siswa", function (err, result) {
            if (err) throw err;
            res.send({
                'result': result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/fetchadmin', function (req, res, next) {
    if (req.session.loggedin) {
        koneksi.query("SELECT * FROM admin WHERE level = 1", function (err, result) {
            if (err) throw err;
            res.send({
                'result': result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/edit/:id_sis', function (req, res, next) {
    if (req.session.loggedin) {
        var id_sis = req.params.id_sis;

        koneksi.query("SELECT * FROM siswa WHERE id_sis = ?", [id_sis], function (err, result, fields) {
            if (err) throw err;
            res.render('admin/editsiswa.ejs', {
                'result': result,
                'data': 'awdawd'
            });
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/editproses', function (req, res, next) {
    if (req.session.loggedin) {
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
    } else {
        res.send('Harus Login!!');
    }


});

router.get('/hapus/:id_sis', function (req, res, next) {
    if (req.session.loggedin) {
        var id_sis = req.params.id_sis;
        koneksi.query("DELETE FROM siswa WHERE id_sis = ?", [id_sis], function (err, result, fields) {
            if (err) throw err;

            req.flash('success', "Data dihapus...");
            res.redirect('/admin/dashboard');
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/editadmin/:id', function (req, res, next) {

    if (req.session.loggedin) {
        var id = req.params.id;

        koneksi.query("SELECT * FROM admin WHERE id = ?", [id], function (err, result, fields) {
            if (err) throw err;
            res.render('admin/editadmin.ejs', {
                'result': result,
            });
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/editprosesadmin', function (req, res, next) {
    if (req.session.loggedin) {
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
    } else {
        res.send('Harus Login!!');
    }


});

router.get('/hapusadmin/:ids', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.params.ids;

        koneksi.query("DELETE FROM admin WHERE id = ?", [ids], function (err, result, fields) {
            if (err) throw err;
            req.flash('success', "Data dihapus...");
            res.redirect('/admin/lihatadmin');
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/lihatguru', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admin/lihatguru.ejs');
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/tambahguru', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('admin/tambahguru.ejs')
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/addguru', function (req, res, next) {
    if (req.session.loggedin) {
        var namaguru = req.body.namaguru;
        var email = req.body.email;
        var password = bcrypt.hashSync('sukses1234', 10);
        var no_wa = req.body.no_wa;
        var jenjang = req.body.jenjang;
        var kelas = req.body.kelas;
        var mapel = req.body.mapel
        var tanggal = new Date();
        var id_gurus = shortid.generate();

        koneksi.query("INSERT INTO guru (id_gurus, nama_guru, email, password, no_wa, dir_image, tanggal, tanggal_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id_gurus, namaguru, email, password, no_wa, 'default.jpg', tanggal, tanggal], function (err, result, fields) {
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
                            res.redirect('/admin/addfotoguru/' + id_gurus);
                            console.log(info)
                        }
                    })


                });
            });
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/addfotoguru/:id_guru', function (req, res, next) {
    if (req.session.loggedin) {
        var id_guru = req.params.id_guru;
        req.flash('success', 'Data disimpan, silahkan upload foto guru...');
        res.render('admin/addfoto.ejs', {
            ids: id_guru
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/addfotoguru', function (req, res, next) {
    if (req.session.loggedin) {
        res.setHeader("Content-Type", "text/html");
        var form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {

            var id_guru = fields.id_gurus;

            fs.rename(files.foto_guru.path, './public/assets/img/foto_guru/' + files.foto_guru.name, function (err) {
                if (err)
                    throw err;
                koneksi.query("UPDATE guru SET dir_image = ? WHERE id_gurus = ?", [files.foto_guru.name, id_guru], function (err, result, fields) {
                    if (err) throw err;
                    req.flash('success', 'Data berhasil disimpan...');
                    res.redirect('/admin/lihatguru');
                })
            });
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/fetchguru', function (req, res, next) {
    if (req.session.loggedin) {
        koneksi.query("SELECT * FROM guru", function (err, result) {
            if (err) throw err;
            res.send({
                'result': result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/editguru/:id_gurus', function (req, res, next) {
    if (req.session.loggedin) {
        var id = req.params.id_gurus;

        koneksi.query("SELECT * FROM guru WHERE id_gurus = ?", [id], function (err, result, fields) {
            if (err) throw err;
            res.render('admin/editguru.ejs', {
                'result': result,
            });
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/editguruprosses', function (req, res, next) {
    if (req.session.loggedin) {
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
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/hapusguru/:id_gurus', function (req, res, next) {
    if (req.session.loggedin) {
        var id = req.params.id_gurus;

        koneksi.query("DELETE FROM guru WHERE id_gurus = ?", [id], function (err, result, fields) {
            if (err) throw err;
            req.flash('success', 'Sudah dihapus...');
            res.redirect('/admin/lihatguru');
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/detailguru/:ids', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.params.ids;

        koneksi.query("SELECT * FROM mapel WHERE id_guru = ?", [ids], function (err, result, fields) {
            res.send({
                'data': result
            });
        });

    } else {
        res.send('Harus Login!!');
    }

});

router.post('/detailguru2/:ids', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.params.ids;

        koneksi.query("SELECT * FROM kelas_guru WHERE id_guru = ?", [ids], function (err, result, fields) {
            res.send({
                'data2': result
            });
        });
    } else {
        res.send('Harus Login!!');
    }


});

router.get('/getkelas/:id_guru', function (req, res, next) {
    if (req.session.loggedin) {
        var id_guru = req.params.id_guru;

        koneksi.query("SELECT * FROM kelas_guru WHERE id_guru = ?", [id_guru], function (err, result, fileds) {
            if (err) throw err;

            res.send({
                data_kelas: result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/getmapel/:id_guru', function (req, res, next) {
    if (req.session.loggedin) {
        var id_guru = req.params.id_guru;

        koneksi.query("SELECT * FROM mapel WHERE id_guru = ?", [id_guru], function (err, result, fileds) {
            if (err) throw err;

            res.send({
                data_mapel: result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/geteditkelas/:id', function (req, res, next) {
    if (req.session.loggedin) {
        var id = req.params.id;

        koneksi.query("SELECT * FROM kelas_guru WHERE id = ?", [id], function (err, result, fileds) {
            if (err) throw err;
            res.send({
                data_kelas: result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.get('/geteditmapel/:id', function (req, res, next) {
    if (req.session.loggedin) {
        var id = req.params.id;

        koneksi.query("SELECT * FROM mapel WHERE id = ?", [id], function (err, result, fileds) {
            if (err) throw err;
            res.send({
                data_mapel: result
            })
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/editkelasprosess', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.body.ids;
        var id_guru = req.body.id_guru;
        var kelas = req.body.kelas;
        var jenjang = req.body.jenjang;
        var tanggal = new Date();

        koneksi.query("UPDATE kelas_guru SET kelas = ?, jenjang = ?, tanggal_update = ? WHERE id = ?", [kelas, jenjang, tanggal, ids], function (err, result, fields) {
            if (err) throw err;
            res.redirect('/admin/editguru/' + id_guru)
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/editmapelprosess', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.body.ids;
        var mapel = req.body.mapel;
        var id_guru = req.body.id_guru;
        var tanggal = new Date();

        koneksi.query("UPDATE mapel SET mapel = ?, tanggal_update = ? WHERE id = ?", [mapel, tanggal, ids], function (err, result, fields) {
            if (err) throw err;
            res.redirect('/admin/editguru/' + id_guru)
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/tambahkelase', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.body.ids;
        var kelas = req.body.kelas;
        var jenjang = req.body.jenjang;
        var tanggal = new Date();

        koneksi.query("INSERT INTO kelas_guru VALUES(NULL, ?, ?, ?, ?, ?)", [ids, jenjang, kelas, tanggal, tanggal], function (err, result, fields) {
            if (err) throw err;
            res.redirect('/admin/editguru/' + ids)
        });
    } else {
        res.send('Harus Login!!');
    }

});

router.post('/tambahmapele', function (req, res, next) {
    if (req.session.loggedin) {
        var ids = req.body.ids;
        var mapel = req.body.mapel;
        var tanggal = new Date();

        koneksi.query("INSERT INTO mapel VALUES(NULL, ?, ?, ?, ?)", [ids, mapel, tanggal, tanggal], function (err, result, fields) {
            if (err) throw err;
            res.redirect('/admin/editguru/' + ids)
        });
    } else {
        res.send('Harus Login!!');
    }

});

module.exports = router;